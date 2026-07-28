import React from 'react';

export interface HTMLComponentProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export class Html extends React.Component<HTMLComponentProps> {
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

  override render() {
    const { attributes, children, ...rest } = this.props;
    const mergedAttrs = { ...Html.defaultAttributes, ...attributes, ...rest };
    return React.createElement('html', mergedAttrs, children);
  }
}

export class Head extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('head', this.props, this.props.children);
  }
}

export class Body extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('body', this.props, this.props.children);
  }
}

export class Title extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('title', this.props, this.props.children);
  }
}

export class Meta extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('meta', this.props);
  }
}

export class Link extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('link', this.props);
  }
}

export class Base extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('base', this.props);
  }
}

export class Div extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('div', this.props, this.props.children);
  }
}

export class Span extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('span', this.props, this.props.children);
  }
}

export class Form extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('form', this.props, this.props.children);
  }
}

export class Details extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('details', this.props, this.props.children);
  }
}

export class Summary extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('summary', this.props, this.props.children);
  }
}

export class Input extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('input', this.props);
  }
}

export class Button extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('button', this.props, this.props.children);
  }
}

export class Img extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('img', this.props);
  }
}

export class Br extends React.Component {
  override render() {
    return React.createElement('br');
  }
}

export class Hr extends React.Component {
  override render() {
    return React.createElement('hr');
  }
}

export class Table extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('table', this.props, this.props.children);
  }
}

export class Thead extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('thead', this.props, this.props.children);
  }
}

export class Tbody extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('tbody', this.props, this.props.children);
  }
}

export class Tfoot extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('tfoot', this.props, this.props.children);
  }
}

export class Tr extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('tr', this.props, this.props.children);
  }
}

export class Td extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('td', this.props, this.props.children);
  }
}

export class Th extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('th', this.props, this.props.children);
  }
}

export class Iframe extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('iframe', this.props);
  }
}

export class Canvas extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('canvas', this.props, this.props.children);
  }
}

export class Textarea extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('textarea', this.props, this.props.children);
  }
}

export class Pre extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('pre', this.props, this.props.children);
  }
}

export class Code extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('code', this.props, this.props.children);
  }
}

export class Header extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('header', this.props, this.props.children);
  }
}

export class Footer extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('footer', this.props, this.props.children);
  }
}

export class Main extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('main', this.props, this.props.children);
  }
}

export class Nav extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('nav', this.props, this.props.children);
  }
}

export class Section extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('section', this.props, this.props.children);
  }
}

export class Article extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('article', this.props, this.props.children);
  }
}

export class Aside extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('aside', this.props, this.props.children);
  }
}

export class H1 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h1', this.props, this.props.children);
  }
}

export class H2 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h2', this.props, this.props.children);
  }
}

export class H3 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h3', this.props, this.props.children);
  }
}

export class H4 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h4', this.props, this.props.children);
  }
}

export class H5 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h5', this.props, this.props.children);
  }
}

export class H6 extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('h6', this.props, this.props.children);
  }
}

export class P extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('p', this.props, this.props.children);
  }
}

export class Ul extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('ul', this.props, this.props.children);
  }
}

export class Li extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('li', this.props, this.props.children);
  }
}

export class A extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('a', this.props, this.props.children);
  }
}

export class Label extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('label', this.props, this.props.children);
  }
}

export class Select extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('select', this.props, this.props.children);
  }
}

export class Option extends React.Component<HTMLComponentProps> {
  override render() {
    return React.createElement('option', this.props, this.props.children);
  }
}

export interface ScriptProps {
  src?: string;
  async?: boolean;
  type?: string;
  content?: string;
  mode?: "raw" | "cdata" | "escaped";
  children?: React.ReactNode;
}

export class Script extends React.Component<ScriptProps> {
  override render() {
    const { src, async, type, content, mode, children, ...rest } = this.props;
    const attrs: Record<string, string> = { ...rest };
    if (src !== undefined) attrs['src'] = src;
    if (type !== undefined) attrs['type'] = type;
    if (async !== undefined) attrs['async'] = String(async);

    const scriptChildren: React.ReactNode[] = [];
    if (children) {
      scriptChildren.push(children);
    }

    if (content !== undefined) {
      const finalMode = mode || "raw";
      if (finalMode === "cdata") {
        scriptChildren.push(`//<![CDATA[\n${content}\n//]]>`);
      } else {
        scriptChildren.push(content);
      }
    }

    return React.createElement('script', attrs, ...scriptChildren);
  }
}

export function expr(attributes: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(attributes)) {
    result[`expr:${key}`] = value;
  }
  return result;
}

export class Expr {
  static attr(key: string, value: string): Record<string, string> {
    return { [`expr:${key}`]: value };
  }

  static get(value: string): string {
    return `data:${value}`;
  }

  static resizeImage(imageUrl: string, newSize: number, ratio?: string, crop?: string): string {
    const args = [imageUrl, String(newSize)];
    if (ratio !== undefined) args.push(`"${ratio}"`);
    if (crop !== undefined) args.push(`"${crop}"`);
    return `resizeImage(${args.join(', ')})`;
  }

  static and(...conds: string[]): string {
    return conds.map(c => `(${c})`).join(' and ');
  }

  static or(...conds: string[]): string {
    return conds.map(c => `(${c})`).join(' or ');
  }

  static not(cond: string): string {
    return `not (${cond})`;
  }

  static eq(a: string, b: string): string {
    return `(${a}) == (${b})`;
  }
}

export class Data {
  static readonly blogTitle = 'data:blog.title';
  static readonly blogUrl = 'data:blog.url';
  static readonly blogPageTitle = 'data:blog.pageTitle';
  static readonly blogPageType = 'data:blog.pageType';
  static readonly blogHomepageUrl = 'data:blog.homepageUrl';
  static readonly blogEncoding = 'data:blog.encoding';
  static readonly blogLanguageDirection = 'data:blog.languageDirection';

  static readonly isHomepage = 'data:view.isHomepage';
  static readonly isPost = 'data:view.isPost';
  static readonly isPage = 'data:view.isPage';
  static readonly isSearch = 'data:view.isSearch';
  static readonly isArchive = 'data:view.isArchive';
  static readonly isMultipleItems = 'data:view.isMultipleItems';
  static readonly isSingleItem = 'data:view.isSingleItem';
  static readonly isError = 'data:view.isError';

  static widget(value: string): string {
    return `data:${value}`;
  }
}

export class Feeds {
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
