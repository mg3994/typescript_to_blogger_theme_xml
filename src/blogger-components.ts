import { Component, DomComponent, RawText } from './core.js';

/**
 * Emits a raw XML comment in the rendered output.
 */
export class XmlComment extends Component {
  constructor(public text: string) {
    super();
  }

  override build(): Component[] {
    return [new RawText(`<!-- ${this.text} -->`)];
  }
}

/**
 * A Blogger section container, mapped to the `b:section` template tag.
 */
export interface BSectionProps {
  id: string;
  className?: string;
  maxwidgets?: number;
  showaddelement?: boolean;
  growth?: string;
  preferred?: boolean;
  children?: any;
}

export class BSection extends DomComponent {
  constructor(props: BSectionProps, ...children: any[]) {
    const { id, className, maxwidgets, showaddelement, growth, preferred, children: propsChildren } = props;
    const attrs: Record<string, string> = { id };
    if (className !== undefined) attrs['class'] = className;
    if (maxwidgets !== undefined) attrs['maxwidgets'] = String(maxwidgets);
    if (showaddelement !== undefined) attrs['showaddelement'] = showaddelement ? 'yes' : 'no';
    if (growth !== undefined) attrs['growth'] = growth;
    if (preferred !== undefined) attrs['preferred'] = String(preferred);

    super('b:section', { attributes: attrs }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Marks where widget settings can be declared inside a Blogger layout.
 */
export interface BWidgetSettingsProps {
  children?: any;
}

export class BWidgetSettings extends DomComponent {
  constructor(props?: BWidgetSettingsProps, ...children: any[]) {
    const propsChildren = props?.children;
    super('b:widget-settings', null, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Represents a named widget setting element.
 */
export interface BWidgetSettingProps {
  name: string;
  children?: any;
}

export class BWidgetSetting extends DomComponent {
  constructor(props: BWidgetSettingProps, ...children: any[]) {
    const { name, children: propsChildren } = props;
    super('b:widget-setting', { name }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Models a Blogger widget definition in the template.
 */
export interface BWidgetProps {
  id: string;
  type: string;
  title?: string;
  locked?: boolean;
  pageType?: string;
  mobile?: string;
  version?: number;
  isVisible?: boolean;
  children?: any;
}

export class BWidget extends DomComponent {
  constructor(props: BWidgetProps, ...children: any[]) {
    const { id, type, title, locked, pageType, mobile, version, isVisible, children: propsChildren } = props;
    const attrs: Record<string, string> = { id, type };
    if (title !== undefined) attrs['title'] = title;
    if (locked !== undefined) attrs['locked'] = String(locked);
    if (pageType !== undefined) attrs['pageType'] = pageType;
    if (mobile !== undefined) attrs['mobile'] = mobile;
    if (version !== undefined) attrs['version'] = String(version);
    if (isVisible !== undefined) attrs['visible'] = String(isVisible);

    super('b:widget', { attributes: attrs }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Renders a conditional `b:if` block in Blogger templates.
 */
export interface BIfProps {
  cond: string;
  children?: any;
}

export class BIf extends DomComponent {
  constructor(props: BIfProps, ...children: any[]) {
    const { cond, children: propsChildren } = props;
    super('b:if', { cond }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Renders a conditional `b:elseif` branch inside a `b:if` block.
 */
export interface BElseIfProps {
  cond: string;
}

export class BElseIf extends DomComponent {
  constructor(props: BElseIfProps) {
    super('b:elseif', { cond: props.cond });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Renders an `b:else` branch for conditional template logic.
 */
export interface BElseProps {
  children?: any;
}

export class BElse extends DomComponent {
  constructor(props?: BElseProps, ...children: any[]) {
    const propsChildren = props?.children;
    super('b:else', null, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Defines a `b:arg` attribute with either a static or expression value.
 */
export interface BArgProps {
  name: string;
  value?: string;
  exprValue?: string;
}

export class BArg extends DomComponent {
  constructor(props: BArgProps) {
    const { name, value, exprValue } = props;
    const attrs: Record<string, string> = { name };
    if (value !== undefined) attrs['value'] = value;
    if (exprValue !== undefined) attrs['expr:value'] = exprValue;

    super('b:arg', { attributes: attrs });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Renders a Blogger loop block using `b:loop`.
 */
export interface BLoopProps {
  values: string;
  varName: string;
  index?: string;
  children?: any;
}

export class BLoop extends DomComponent {
  constructor(props: BLoopProps, ...children: any[]) {
    const { values, varName, index, children: propsChildren } = props;
    const attrs: Record<string, string> = { values, var: varName };
    if (index !== undefined) attrs['index'] = index;

    super('b:loop', { attributes: attrs }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Writes a Blogger `data:` node with the provided value.
 */
export interface BDataProps {
  value: string;
}

export class BData extends DomComponent {
  constructor(props: BDataProps | string) {
    const val = typeof props === 'string' ? props : props.value;
    super(`data:${val}`);
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Describes a template variable for Blogger skin or configuration metadata.
 */
export interface BVariableProps {
  name: string;
  description: string;
  type: string;
  defaultValue: string;
  value?: string;
}

export class BVariable {
  public name: string;
  public description: string;
  public type: string;
  public defaultValue: string;
  public value?: string;

  constructor(props: BVariableProps) {
    this.name = props.name;
    this.description = props.description;
    this.type = props.type;
    this.defaultValue = props.defaultValue;
    this.value = props.value;
  }

  toString(): string {
    return ` <Variable name="${this.name}" description="${this.description}" type="${this.type}" default="${this.defaultValue}"${this.value !== undefined ? ` value="${this.value}"` : ''}/>`;
  }
}

/**
 * Groups multiple [BVariable] definitions for use in a Blogger skin.
 */
export interface BGroupProps {
  description: string;
  selector?: string;
  variables: BVariable[];
}

export class BGroup {
  public description: string;
  public selector?: string;
  public variables: BVariable[];

  constructor(props: BGroupProps) {
    this.description = props.description;
    this.selector = props.selector;
    this.variables = props.variables;
  }

  toString(): string {
    let sb = ` <Group description="${this.description}"${this.selector !== undefined ? ` selector="${this.selector}"` : ''}>\n`;
    for (const v of this.variables) {
      sb += v.toString() + '\n';
    }
    sb += ' </Group>';
    return sb;
  }
}

/**
 * Builds a Blogger template skin block with optional CSS variables.
 */
export interface BSkinProps {
  css: string;
  variables?: (BVariable | BGroup)[];
}

export class BSkin extends Component {
  public css: string;
  public variables?: (BVariable | BGroup)[];

  constructor(props: BSkinProps | string) {
    super();
    if (typeof props === 'string') {
      this.css = props;
    } else {
      this.css = props.css;
      this.variables = props.variables;
    }
  }

  override build(): Component[] {
    let sb = '';
    if (this.variables && this.variables.length > 0) {
      sb += '/*\n * Variable definitions:\n';
      for (const v of this.variables) {
        sb += v.toString() + '\n';
      }
      sb += ' */\n';
    }
    sb += this.css;

    return [
      new XmlComment('prettier-ignore'),
      new DomComponent('b:skin', null, new RawText(`<![CDATA[\n${sb}\n]]>`)),
    ];
  }
}

/**
 * Includes a Blogger template fragment by name.
 */
export interface BIncludeProps {
  name: string;
  data?: string;
  cond?: string;
}

export class BInclude extends DomComponent {
  constructor(props: BIncludeProps) {
    const { name, data, cond } = props;
    const attrs: Record<string, string> = { name };
    if (data !== undefined) attrs['data'] = data;
    if (cond !== undefined) attrs['cond'] = cond;

    super('b:include', { attributes: attrs });
  }
}

/**
 * Defines a named includable fragment for later use.
 */
export interface BIncludableProps {
  id: string;
  varName?: string;
  children?: any;
}

export class BIncludable extends DomComponent {
  constructor(props: BIncludableProps, ...children: any[]) {
    const { id, varName, children: propsChildren } = props;
    const attrs: Record<string, string> = { id };
    if (varName !== undefined) attrs['var'] = varName;

    super('b:includable', { attributes: attrs }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Adds a conditional attribute entry using Blogger's `b:attr` tag.
 */
export interface BAttrProps {
  name: string;
  value: string;
  exprValue?: string;
  cond?: string;
}

export class BAttr extends DomComponent {
  constructor(props: BAttrProps) {
    const { name, value, exprValue, cond } = props;
    const attrs: Record<string, string> = { name, value };
    if (exprValue !== undefined) attrs['expr:value'] = exprValue;
    if (cond !== undefined) attrs['cond'] = cond;

    super('b:attr', { attributes: attrs });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Adds a conditional CSS class via Blogger's `b:class` tag.
 */
export interface BClassProps {
  name: string;
  cond: string;
}

export class BClass extends DomComponent {
  constructor(props: BClassProps) {
    const { name, cond } = props;
    super('b:class', { name, cond });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Creates a dynamic HTML tag using Blogger template helper syntax.
 */
export interface BTagProps {
  name?: string;
  cond?: string;
  attributesz?: Record<string, string>;
  children?: any;
}

export class BTag extends DomComponent {
  constructor(props: BTagProps, ...children: any[]) {
    const { name, cond, attributesz, children: propsChildren } = props;
    const attrs: Record<string, string> = {};
    if (name !== undefined) attrs['name'] = name;
    if (cond !== undefined) attrs['cond'] = cond;
    if (attributesz) {
      Object.assign(attrs, attributesz);
    }

    super('b:tag', { attributes: attrs }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Evaluates an expression and renders the result in the template.
 */
export interface BEvalProps {
  expr: string;
}

export class BEval extends DomComponent {
  constructor(props: BEvalProps) {
    super('b:eval', { expr: props.expr });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Sets a local variable using Blogger's `b:with` helper.
 */
export interface BWithProps {
  varName: string;
  value: string;
  children?: any;
}

export class BWith extends DomComponent {
  constructor(props: BWithProps, ...children: any[]) {
    const { varName, value, children: propsChildren } = props;
    super('b:with', { var: varName, value }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Renders a Blogger switch block.
 */
export interface BSwitchProps {
  varName: string;
  children?: any;
}

export class BSwitch extends DomComponent {
  constructor(props: BSwitchProps, ...children: any[]) {
    const { varName, children: propsChildren } = props;
    super('b:switch', { var: varName }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Creates a case branch inside a Blogger `b:switch` block.
 */
export interface BCaseProps {
  value: string;
  children?: any;
}

export class BCase extends DomComponent {
  constructor(props: BCaseProps, ...children: any[]) {
    const { value, children: propsChildren } = props;
    super('b:case', { value }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Represents the default branch of a `b:switch` block.
 */
export interface BDefaultProps {
  children?: any;
}

export class BDefault extends DomComponent {
  constructor(props?: BDefaultProps, ...children: any[]) {
    const propsChildren = props?.children;
    super('b:default', null, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Defines a translatable Blogger message block.
 */
export interface BMessageProps {
  name: string;
  children?: any;
}

export class BMessage extends DomComponent {
  constructor(props: BMessageProps, ...children: any[]) {
    const { name, children: propsChildren } = props;
    super('b:message', { name }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Emits a Blogger comment node.
 */
export interface BCommentProps {
  children?: any;
}

export class BComment extends DomComponent {
  constructor(props?: BCommentProps, ...children: any[]) {
    const propsChildren = props?.children;
    super('b:comment', null, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Wraps raw CSS content in a Blogger `b:template-skin` block.
 */
export interface BTemplateSkinProps {
  css: string;
}

export class BTemplateSkin extends Component {
  public css: string;

  constructor(props: BTemplateSkinProps | string) {
    super();
    this.css = typeof props === 'string' ? props : props.css;
  }

  override build(): Component[] {
    return [
      new XmlComment('prettier-ignore'),
      new DomComponent('b:template-skin', null, new RawText(`<![CDATA[\n${this.css}\n]]>`)),
    ];
  }
}

/**
 * Declares a Blogger template script dependency.
 */
export interface BTemplateScriptProps {
  name: string;
  version: string;
  async?: boolean;
}

export class BTemplateScript extends DomComponent {
  constructor(props: BTemplateScriptProps) {
    const { name, version, async } = props;
    const attrs: Record<string, string> = { name, version };
    if (async !== undefined) attrs['async'] = String(async);

    super('b:template-script', { attributes: attrs });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Represents a named or expression parameter for template helpers.
 */
export interface BParamProps {
  value?: string;
  exprValue?: string;
}

export class BParam extends DomComponent {
  constructor(props: BParamProps) {
    const { value, exprValue } = props;
    const attrs: Record<string, string> = {};
    if (value !== undefined) attrs['value'] = value;
    if (exprValue !== undefined) attrs['expr:value'] = exprValue;

    super('b:param', { attributes: attrs });
  }

  override build(): Component[] {
    return [];
  }
}

/**
 * Declares a default markup type within the Blogger template.
 */
export interface BDefaultMarkupProps {
  type: string;
  children?: any;
}

export class BDefaultMarkup extends DomComponent {
  constructor(props: BDefaultMarkupProps, ...children: any[]) {
    const { type, children: propsChildren } = props;
    super('b:defaultmarkup', { type }, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}

/**
 * Container for multiple default markup declarations.
 */
export interface BDefaultMarkupsProps {
  children?: any;
}

export class BDefaultMarkups extends DomComponent {
  constructor(props?: BDefaultMarkupsProps, ...children: any[]) {
    const propsChildren = props?.children;
    super('b:defaultmarkups', null, ...((propsChildren ? [propsChildren] : []).concat(children)));
  }
}
