import { DomComponent, Component, Text, RawText } from './core.js';

/**
 * The root HTML element for a Blogger template.
 * Automatically merges the Blogger-required namespace and default template
 * attributes unless overridden.
 */
export class Html extends DomComponent {
  static defaultAttributes = {
    'b:css': 'false',
    'b:defaultwidgetversion': '2',
    'b:layoutsversion': '3',
    'b:responsive': 'true',
    'expr:dir': 'data:blog.languageDirection',
    'expr:lang': 'data:blog.locale',
    'xmlns': 'http://www.w3.org/1999/xhtml',
    'xmlns:b': 'http://www.google.com/2005/gml/b',
    'xmlns:data': 'http://www.google.com/2005/gml/data',
    'xmlns:expr': 'http://www.google.com/2005/gml/expr',
  };

  constructor(props?: Record<string, any> | null, ...children: any[]) {
    const mergedProps = Html._mergeProps(props);
    super('html', mergedProps, ...children);
  }

  private static _mergeProps(props?: Record<string, any> | null): Record<string, any> {
    const res: Record<string, any> = {};
    const attrs: Record<string, string> = { ...Html.defaultAttributes };

    if (props) {
      if ('attributes' in props && props.attributes && typeof props.attributes === 'object') {
        Object.assign(attrs, props.attributes);
        Object.assign(res, props);
        res.attributes = attrs;
      } else {
        const { children, ...restAttrs } = props;
        Object.assign(attrs, restAttrs);
        Object.assign(res, attrs);
        if (children !== undefined) {
          res.children = children;
        }
      }
    } else {
      Object.assign(res, attrs);
    }
    return res;
  }
}

/**
 * Standard head element.
 */
export class Head extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('head', props, ...children);
  }
}

/**
 * Standard body element.
 */
export class Body extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('body', props, ...children);
  }
}

/**
 * Standard title element.
 */
export class Title extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('title', props, ...children);
  }
}

/**
 * Standard self-closing meta element.
 */
export class Meta extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('meta', props);
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard self-closing link element.
 */
export class Link extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('link', props);
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard self-closing base element.
 */
export class Base extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('base', props);
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard div element.
 */
export class Div extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('div', props, ...children);
  }
}

/**
 * Standard form element.
 */
export class Form extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('form', props, ...children);
  }
}

/**
 * Standard details disclosure element.
 */
export class Details extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('details', props, ...children);
  }
}

/**
 * Standard summary element.
 */
export class Summary extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('summary', props, ...children);
  }
}

/**
 * Standard self-closing input element.
 */
export class Input extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('input', props);
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard button element.
 */
export class Button extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('button', props, ...children);
  }
}

/**
 * Standard self-closing image element.
 */
export class Img extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('img', props);
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard self-closing line break.
 */
export class Br extends DomComponent {
  constructor() {
    super('br');
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard self-closing horizontal rule.
 */
export class Hr extends DomComponent {
  constructor() {
    super('hr');
  }
  override build(): Component[] {
    return [];
  }
}

/**
 * Standard script element, supporting embedded text or CDATA block.
 */
export interface ScriptProps {
  src?: string;
  async?: boolean;
  type?: string;
  content?: string;
  mode?: "raw" | "cdata" | "escaped";
  children?: any;
}

export class Script extends DomComponent {
  constructor(props?: ScriptProps | null, ...children: any[]) {
    const p = props || {};
    const attrs: Record<string, string> = {};
    if (p.src !== undefined) attrs['src'] = p.src;
    if (p.type !== undefined) attrs['type'] = p.type;
    if (p.async !== undefined) attrs['async'] = String(p.async);

    const scriptChildren: any[] = [];
    if (p.children !== undefined) {
      scriptChildren.push(p.children);
    }
    scriptChildren.push(...children);

    if (p.content !== undefined) {
      const mode = p.mode || "raw";
      if (mode === "cdata") {
        scriptChildren.push(new RawText(`//<![CDATA[\n${p.content}\n//]]>`));
      } else if (mode === "escaped") {
        scriptChildren.push(new Text(p.content, true));
      } else {
        scriptChildren.push(new Text(p.content, false));
      }
    }

    super('script', { attributes: attrs }, ...scriptChildren);
  }
}

/**
 * Translates standard attribute maps into expression attributes.
 */
export function expr(attributes: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(attributes)) {
    result[`expr:${key}`] = value;
  }
  return result;
}

/**
 * Helper class for building Blogger 'expr:' and 'data:' references.
 */
export class Expr {
  /**
   * Creates an expression attribute mapping.
   */
  static attr(key: string, value: string): Record<string, string> {
    return { [`expr:${key}`]: value };
  }

  /**
   * Returns a Blogger data reference.
   */
  static get(value: string): string {
    return `data:${value}`;
  }

  /**
   * Creates a Blogger resizeImage expression.
   */
  static resizeImage(imageUrl: string, newSize: number, ratio?: string, crop?: string): string {
    const args = [imageUrl, String(newSize)];
    if (ratio !== undefined) args.push(`"${ratio}"`);
    if (crop !== undefined) args.push(`"${crop}"`);
    return `resizeImage(${args.join(', ')})`;
  }

  /**
   * Combines multiple conditions with 'and'.
   */
  static and(...conds: string[]): string {
    return conds.map(c => `(${c})`).join(' and ');
  }

  /**
   * Combines multiple conditions with 'or'.
   */
  static or(...conds: string[]): string {
    return conds.map(c => `(${c})`).join(' or ');
  }

  /**
   * Negates a condition.
   */
  static not(cond: string): string {
    return `not (${cond})`;
  }

  /**
   * Compares two values for equality.
   */
  static eq(a: string, b: string): string {
    return `(${a}) == (${b})`;
  }
}

/**
 * Known Blogger data reference variables.
 */
export class Data {
  // Global Blog Data
  static readonly blogTitle = 'data:blog.title';
  static readonly blogUrl = 'data:blog.url';
  static readonly blogPageTitle = 'data:blog.pageTitle';
  static readonly blogPageType = 'data:blog.pageType';
  static readonly blogHomepageUrl = 'data:blog.homepageUrl';
  static readonly blogEncoding = 'data:blog.encoding';
  static readonly blogLanguageDirection = 'data:blog.languageDirection';

  // View Data
  static readonly isHomepage = 'data:view.isHomepage';
  static readonly isPost = 'data:view.isPost';
  static readonly isPage = 'data:view.isPage';
  static readonly isSearch = 'data:view.isSearch';
  static readonly isArchive = 'data:view.isArchive';
  static readonly isMultipleItems = 'data:view.isMultipleItems';
  static readonly isSingleItem = 'data:view.isSingleItem';
  static readonly isError = 'data:view.isError';

  /**
   * Creates a widget-scoped data reference.
   */
  static widget(value: string): string {
    return `data:${value}`;
  }
}

/**
 * Helpers to build Blogger feed URLs.
 */
export class Feeds {
  /**
   * Builds a feed URL for blog posts.
   */
  static posts(options?: { maxResults?: number; orderBy?: string; alt?: string; label?: string }): string {
    let path = 'feeds/posts/default';
    if (options?.label) {
      path += `/-/${options.label}`;
    }
    const params: string[] = [];
    if (options?.maxResults !== undefined) {
      params.push(`max-results=${options.maxResults}`);
    }
    if (options?.orderBy) {
      params.push(`orderby=${options.orderBy}`);
    }
    if (options?.alt) {
      params.push(`alt=${options.alt}`);
    }
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    return `${Data.blogHomepageUrl}${path}${query}`;
  }

  /**
   * Builds a summary feed URL.
   */
  static summary(options?: { maxResults?: number; alt?: string }): string {
    const params: string[] = [];
    if (options?.maxResults !== undefined) {
      params.push(`max-results=${options.maxResults}`);
    }
    if (options?.alt) {
      params.push(`alt=${options.alt}`);
    }
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    return `${Data.blogHomepageUrl}feeds/summary${query}`;
  }
}

// Additional helper components
export class Span extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('span', props, ...children);
  }
}

export class Header extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('header', props, ...children);
  }
}

export class Footer extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('footer', props, ...children);
  }
}

export class Main extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('main', props, ...children);
  }
}

export class Nav extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('nav', props, ...children);
  }
}

export class Section extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('section', props, ...children);
  }
}

export class Article extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('article', props, ...children);
  }
}

export class Aside extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('aside', props, ...children);
  }
}

export class H1 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h1', props, ...children);
  }
}

export class H2 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h2', props, ...children);
  }
}

export class H3 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h3', props, ...children);
  }
}

export class H4 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h4', props, ...children);
  }
}

export class H5 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h5', props, ...children);
  }
}

export class H6 extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('h6', props, ...children);
  }
}

export class P extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('p', props, ...children);
  }
}

export class Ul extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('ul', props, ...children);
  }
}

export class Li extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('li', props, ...children);
  }
}

export class A extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('a', props, ...children);
  }
}

export class Label extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('label', props, ...children);
  }
}

export class Select extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('select', props, ...children);
  }
}

export class Option extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('option', props, ...children);
  }
}

export class Table extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('table', props, ...children);
  }
}

export class Thead extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('thead', props, ...children);
  }
}

export class Tbody extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('tbody', props, ...children);
  }
}

export class Tfoot extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('tfoot', props, ...children);
  }
}

export class Tr extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('tr', props, ...children);
  }
}

export class Td extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('td', props, ...children);
  }
}

export class Th extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('th', props, ...children);
  }
}

export class Iframe extends DomComponent {
  constructor(props?: Record<string, any> | null) {
    super('iframe', props);
  }
  override build(): Component[] {
    return [];
  }
}

export class Canvas extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('canvas', props, ...children);
  }
}

export class Textarea extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('textarea', props, ...children);
  }
}

export class Pre extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('pre', props, ...children);
  }
}

export class Code extends DomComponent {
  constructor(props?: Record<string, any> | null, ...children: any[]) {
    super('code', props, ...children);
  }
}
