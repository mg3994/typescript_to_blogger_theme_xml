/**
 * Escapes XML reserved characters in text content, filters XML 1.0 restricted control characters (C0 and C1),
 * and converts non-ASCII Unicode characters/symbols into safe XML hexadecimal Numeric Character References (NCRs).
 */
export function escapeXml(text: string): string {
  const regex = /[&<>"']|[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]|[^\x09\x0A\x0D\x20-\x7E]/gu;
  return text.replace(regex, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: {
        const code = char.codePointAt(0);
        if (code === undefined) return ' ';
        // restricted XML 1.0 C0 and C1 control characters are replaced with space
        if (
          (code >= 0x00 && code <= 0x08) ||
          code === 0x0B ||
          code === 0x0C ||
          (code >= 0x0E && code <= 0x1F) ||
          (code >= 0x7F && code <= 0x9F)
        ) {
          return ' ';
        }
        // convert all other non-ASCII characters to hexadecimal XML numeric character references
        return '&#x' + code.toString(16).toUpperCase() + ';';
      }
    }
  });
}

/**
 * A node in the Blogger theme component tree.
 * All renderable objects in this package extend or implement [Component].
 */
export abstract class Component {
  public props?: any;

  abstract build(): Iterable<Component> | Component | null | void;

  /**
   * Renders this component tree to an XML string.
   */
  render(renderer: Renderer = new Renderer()): string {
    return renderer.render(this);
  }
}

/**
 * A text node that is rendered with optional XML escaping.
 */
export class Text extends Component {
  constructor(public value: string, public escape: boolean = true) {
    super();
  }

  override build(): Iterable<Component> | null {
    return null;
  }
}

/**
 * A raw text node that disables XML escaping.
 */
export class RawText extends Text {
  constructor(value: string) {
    super(value, false);
  }
}

/**
 * A DOM-like element with a tag, attributes, and child components.
 */
function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function stringifyStyle(styleObj: Record<string, any>): string {
  return Object.entries(styleObj)
    .map(([key, val]) => {
      const formattedKey = camelToKebab(key);
      const formattedVal = typeof val === 'number' && val !== 0 ? `${val}px` : String(val);
      return `${formattedKey}: ${formattedVal};`;
    })
    .join(' ');
}

function convertReactAttributeToHtml(key: string): string {
  if (key.startsWith('data-') || key.startsWith('aria-') || key.startsWith('expr:')) {
    return key;
  }
  const mapping: Record<string, string> = {
    className: 'class',
    htmlFor: 'for',
    tabIndex: 'tabindex',
    autoFocus: 'autofocus',
    autoPlay: 'autoplay',
    readOnly: 'readonly',
    maxLength: 'maxlength',
    minLength: 'minlength',
    formAction: 'formaction',
    formEncType: 'formenctype',
    formMethod: 'formmethod',
    formNoValidate: 'formnovalidate',
    formTarget: 'formtarget',
    noValidate: 'novalidate',
    srcSet: 'srcset',
    controlsList: 'controlslist',
    crossOrigin: 'crossorigin',
    playsInline: 'playsinline',
    colSpan: 'colspan',
    rowSpan: 'rowspan',
    cellPadding: 'cellpadding',
    cellSpacing: 'cellspacing',
    srcDoc: 'srcdoc',
    referrerPolicy: 'referrerpolicy',
  };
  if (mapping[key]) {
    return mapping[key];
  }
  if (/^on[A-Z]/.test(key)) {
    return key.toLowerCase();
  }
  return key;
}

export class DomComponent extends Component {
  public tag: string;
  public attributes: Record<string, string> = {};
  public children: Component[] = [];

  constructor(
    tag: string,
    config?: Record<string, any> | null,
    ...restChildren: (Component | string | null | undefined)[]
  ) {
    super();
    this.tag = tag;

    if (config) {
      // Check if this config is standard attributes or if it is a structured options object
      // (like { attributes: { ... }, children: [...] } as in Option C/Dart style)
      if (
        'attributes' in config &&
        (config.attributes === null || typeof config.attributes === 'object') &&
        !('build' in config) && // make sure it's not a Component itself
        !Array.isArray(config.attributes)
      ) {
        // Flat Option Object shape: { attributes: Record<string, string>, children?: Iterable<Component> }
        const attrs = config.attributes as Record<string, any> | null;
        if (attrs) {
          for (const [key, val] of Object.entries(attrs)) {
            if (val !== null && val !== undefined) {
              const isBloggerTag = tag.startsWith('b:');
              const htmlKey = isBloggerTag ? key : convertReactAttributeToHtml(key);
              if (htmlKey === 'style' && typeof val === 'object' && !Array.isArray(val)) {
                this.attributes['style'] = stringifyStyle(val);
              } else {
                this.attributes[htmlKey] = String(val);
              }
            }
          }
        }
        if ('children' in config && config.children) {
          this._addChildren(config.children as Iterable<Component | string | null | undefined>);
        }
      } else {
        // Option B: config is directly the map of attributes.
        // e.g. { class: "wrapper-pane", id: "header-area" }
        for (const [key, val] of Object.entries(config)) {
          if (key === 'children') {
            if (val) {
              this._addChildren(Array.isArray(val) ? val : [val]);
            }
            continue;
          }
          if (val !== null && val !== undefined) {
            const isBloggerTag = tag.startsWith('b:');
            const htmlKey = isBloggerTag ? key : convertReactAttributeToHtml(key);
            if (htmlKey === 'style' && typeof val === 'object' && !Array.isArray(val)) {
              this.attributes['style'] = stringifyStyle(val);
            } else {
              this.attributes[htmlKey] = String(val);
            }
          }
        }
      }
    }

    if (restChildren && restChildren.length > 0) {
      this._addChildren(restChildren);
    }
  }

  private _addChildren(childrenList: Iterable<any>) {
    for (const child of childrenList) {
      if (child === null || child === undefined) {
        continue;
      }
      if (
        child instanceof Component ||
        (typeof child === 'object' && 'build' in child && typeof (child as any).build === 'function')
      ) {
        this.children.push(child);
      } else if (typeof child === 'string') {
        this.children.push(new Text(child));
      } else if (typeof child === 'number' || typeof child === 'boolean') {
        this.children.push(new Text(String(child)));
      } else if (typeof child === 'object' && Symbol.iterator in child) {
        this._addChildren(child);
      }
    }
  }

  override build(): Iterable<Component> {
    return this.children;
  }
}

/**
 * A wrapper for grouping components without introducing a DOM tag.
 */
export class Fragment extends Component {
  public children: Component[] = [];

  constructor(
    config?: { children?: Iterable<Component | string | null | undefined> } | null,
    ...restChildren: (Component | string | null | undefined)[]
  ) {
    super();
    if (config && 'children' in config && config.children) {
      this._addChildren(config.children);
    }
    if (restChildren && restChildren.length > 0) {
      this._addChildren(restChildren);
    }
  }

  private _addChildren(childrenList: Iterable<any>) {
    for (const child of childrenList) {
      if (child === null || child === undefined) {
        continue;
      }
      if (
        child instanceof Component ||
        (typeof child === 'object' && 'build' in child && typeof (child as any).build === 'function')
      ) {
        this.children.push(child);
      } else if (typeof child === 'string') {
        this.children.push(new Text(child));
      } else if (typeof child === 'number' || typeof child === 'boolean') {
        this.children.push(new Text(String(child)));
      } else if (typeof child === 'object' && Symbol.iterator in child) {
        this._addChildren(child);
      }
    }
  }

  override build(): Iterable<Component> {
    return this.children;
  }
}

/**
 * Renders a [Component] tree to an XML string.
 */
export class Renderer {
  render(component: Component): string {
    let sb = '';
    this._renderComponent(component, (chunk) => {
      sb += chunk;
    });
    return sb;
  }

  private _renderComponent(component: any, write: (chunk: string) => void): void {
    if (component && typeof component.value === 'string' && typeof component.escape === 'boolean') {
      // It's a Text node
      write(component.escape ? escapeXml(component.value) : component.value);
    } else if (component && typeof component.tag === 'string' && component.attributes !== undefined) {
      // It's a DomComponent node
      write(`<${component.tag}`);
      for (const [key, value] of Object.entries(component.attributes)) {
        write(` ${key}="${escapeXml(value as string)}"`);
      }

      const built = component.build();
      const childrenArray = built ? Array.from(built) : [];

      if (childrenArray.length === 0) {
        write('/>');
      } else {
        write('>');
        for (const child of childrenArray) {
          this._renderComponent(child, write);
        }
        write(`</${component.tag}>`);
      }
    } else if (component && typeof component.build === 'function') {
      const built = component.build();
      if (built) {
        if (
          typeof built.build === 'function' ||
          (built && typeof built.value === 'string' && typeof built.escape === 'boolean') ||
          (built && typeof built.tag === 'string' && built.attributes !== undefined)
        ) {
          this._renderComponent(built, write);
        } else {
          for (const child of built) {
            this._renderComponent(child, write);
          }
        }
      }
    }
  }
}

/**
 * Minifies the rendered XML document by collapsing extraneous spaces and tabs,
 * while safely preserving CDATA blocks intact.
 */
export function minifyXml(xml: string): string {
  const parts = xml.split(/(<!\[CDATA\[[\s\S]*?\]\]>)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<![CDATA[')) {
      parts[i] = parts[i]
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  }
  return parts.join('');
}
