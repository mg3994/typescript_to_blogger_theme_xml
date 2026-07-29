import React from 'react';

// Browser-safe fallback CSS loader that simply returns the CSS string directly
function bundleCss(cssInput: string): string {
  return cssInput;
}

export interface BloggerComponentProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export function BSection({ id, class: cls, className, maxwidgets, showaddelement, growth, preferred, cond, children, ...rest }: BloggerComponentProps & { id: string }) {
  const finalClass = cls || className;
  const showAdd = typeof showaddelement === 'boolean' ? (showaddelement ? 'yes' : 'no') : showaddelement;
  return React.createElement('b:section', {
    id,
    className: finalClass,
    maxwidgets,
    showaddelement: showAdd,
    growth,
    preferred: preferred !== undefined ? String(preferred) : undefined,
    cond,
    ...rest
  }, children);
}

export function BWidget({ id, type, title, locked, pageType, mobile, version, isVisible, children, ...rest }: BloggerComponentProps & { id: string; type: string }) {
  const isVis = typeof isVisible === 'boolean' ? (isVisible ? 'true' : 'false') : isVisible;
  const isLocked = typeof locked === 'boolean' ? (locked ? 'true' : 'false') : locked;
  return React.createElement('b:widget', {
    id,
    type,
    title,
    locked: isLocked,
    pagetype: pageType,
    mobile,
    version: version !== undefined ? String(version) : undefined,
    visible: isVis,
    ...rest
  }, children);
}

export function BWidgetSettings({ children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:widget-settings', rest, children);
}

export function BWidgetSetting({ name, value, children, ...rest }: BloggerComponentProps & { name: string }) {
  return React.createElement('b:widget-setting', { name, ...rest }, value || children);
}

export function BIf({ cond, children, ...rest }: BloggerComponentProps & { cond: string }) {
  return React.createElement('b:if', { cond, ...rest }, children);
}

export function BElseIf({ cond, children, ...rest }: BloggerComponentProps & { cond: string }) {
  return React.createElement('b:elseif', { cond, ...rest }, children);
}

export function BElse({ children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:else', rest, children);
}

export function BLoop({ values, var: varName, varName: alternativeVar, index, children, ...rest }: BloggerComponentProps & { values: string }) {
  return React.createElement('b:loop', {
    values,
    var: varName || alternativeVar,
    index,
    ...rest
  }, children);
}

export function BInclude({ name, data, cond, children, ...rest }: BloggerComponentProps & { name: string }) {
  return React.createElement('b:include', {
    name,
    data,
    cond,
    ...rest
  }, children);
}

export function BIncludable({ id, var: varName, varName: alternativeVar, children, ...rest }: BloggerComponentProps & { id: string }) {
  return React.createElement('b:includable', {
    id,
    var: varName || alternativeVar,
    ...rest
  }, children);
}

export function BIncludeParam({ name, value, ...rest }: BloggerComponentProps) {
  return React.createElement('b:param', { name, value, ...rest });
}

export function BAttr({ name, value, cond, children, ...rest }: BloggerComponentProps & { name: string }) {
  return React.createElement('b:attr', {
    name,
    value,
    cond,
    ...rest
  }, children);
}

export function BClass({ name, cond, children, ...rest }: BloggerComponentProps & { name: string; cond: string }) {
  return React.createElement('b:class', {
    name,
    cond,
    ...rest
  }, children);
}

export function BTag({ name, cond, children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:tag', {
    name,
    cond,
    ...rest
  }, children);
}

export function BEval({ expr, ...rest }: BloggerComponentProps & { expr: string }) {
  return React.createElement('b:eval', { expr, ...rest });
}

export function BWith({ var: varName, varName: alternativeVar, value, children, ...rest }: BloggerComponentProps & { value: string }) {
  return React.createElement('b:with', {
    var: varName || alternativeVar,
    value,
    ...rest
  }, children);
}

export function BSwitch({ var: varName, varName: alternativeVar, children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:switch', {
    var: varName || alternativeVar,
    ...rest
  }, children);
}

export function BCase({ value, children, ...rest }: BloggerComponentProps & { value: string }) {
  return React.createElement('b:case', { value, ...rest }, children);
}

export function BDefault({ children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:default', rest, children);
}

export function BMessage({ name, children, ...rest }: BloggerComponentProps & { name: string }) {
  return React.createElement('b:message', { name, ...rest }, children);
}

export function BComment({ children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:comment', rest, children);
}

export function BSkin({ css, variables, children, ...rest }: BloggerComponentProps & { css: string }) {
  let sb = '';
  if (variables && variables.length > 0) {
    sb += '/*\n * Variable definitions:\n';
    for (const v of variables) {
      sb += v.toString() + '\n';
    }
    sb += ' */\n';
  }
  sb += bundleCss(css);

  const cdataContent = `\n${sb}\n`;
  return React.createElement('b:skin', {
    ...rest,
    dangerouslySetInnerHTML: { __html: `<![CDATA[${cdataContent}]]>` }
  });
}

export function BTemplateSkin({ css, ...rest }: BloggerComponentProps & { css: string }) {
  const bundled = bundleCss(css);
  return React.createElement('b:template-skin', {
    ...rest,
    dangerouslySetInnerHTML: { __html: `<![CDATA[\n${bundled}\n]]>` }
  });
}

export function BTemplateScript({ name, version, async, ...rest }: BloggerComponentProps & { name: string; version: string }) {
  return React.createElement('b:template-script', {
    name,
    version,
    async: async !== undefined ? String(async) : undefined,
    ...rest
  });
}

export function BParam({ name, value, ...rest }: BloggerComponentProps) {
  return React.createElement('b:param', { name, value, ...rest });
}

export function BDefaultMarkup({ type, children, ...rest }: BloggerComponentProps & { type: string }) {
  return React.createElement('b:defaultmarkup', { type, ...rest }, children);
}

export function BDefaultMarkups({ children, ...rest }: BloggerComponentProps) {
  return React.createElement('b:defaultmarkups', rest, children);
}

export function BData({ value }: { value: string }) {
  return React.createElement(`data:${value}`);
}

export class BVariable {
  constructor(public props: { name: string; description: string; type: string; defaultValue: string; value?: string }) {}
  toString(): string {
    return ` <Variable name="${this.props.name}" description="${this.props.description}" type="${this.props.type}" default="${this.props.defaultValue}"${this.props.value !== undefined ? ` value="${this.props.value}"` : ''}/>`;
  }
}

export class BGroup {
  constructor(public props: { description: string; selector?: string; variables: BVariable[] }) {}
  toString(): string {
    let sb = ` <Group description="${this.props.description}"${this.props.selector !== undefined ? ` selector="${this.props.selector}"` : ''}>\n`;
    for (const v of this.props.variables) {
      sb += v.toString() + '\n';
    }
    sb += ' </Group>';
    return sb;
  }
}
