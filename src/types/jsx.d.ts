import { Component } from '../core.js';

declare global {
  namespace JSX {
    interface Element extends Component {}
    interface ElementClass extends Component {}

    interface HTMLAttributes {
      id?: string;
      class?: string;
      className?: string;
      style?: string;
      title?: string;
      name?: string;
      type?: string;
      value?: string | number;
      placeholder?: string;
      disabled?: boolean;
      href?: string;
      target?: string;
      src?: string;
      alt?: string;
      width?: string | number;
      height?: string | number;
      async?: boolean | string;
      defer?: boolean | string;
      rel?: string;
      media?: string;
      method?: string;
      action?: string;
      rows?: number;
      cols?: number;
      checked?: boolean;
      selected?: boolean;
      [attributeName: string]: any;
    }

    interface IntrinsicElements {
      // Standard HTML elements
      html: HTMLAttributes;
      head: HTMLAttributes;
      body: HTMLAttributes;
      title: HTMLAttributes;
      meta: HTMLAttributes;
      link: HTMLAttributes;
      base: HTMLAttributes;
      div: HTMLAttributes;
      span: HTMLAttributes;
      p: HTMLAttributes;
      h1: HTMLAttributes;
      h2: HTMLAttributes;
      h3: HTMLAttributes;
      h4: HTMLAttributes;
      h5: HTMLAttributes;
      h6: HTMLAttributes;
      ul: HTMLAttributes;
      li: HTMLAttributes;
      ol: HTMLAttributes;
      a: HTMLAttributes;
      img: HTMLAttributes;
      input: HTMLAttributes;
      button: HTMLAttributes;
      form: HTMLAttributes;
      label: HTMLAttributes;
      select: HTMLAttributes;
      option: HTMLAttributes;
      textarea: HTMLAttributes;
      script: HTMLAttributes & { src?: string; type?: string; async?: boolean | string; contentInCDATA?: boolean };
      style: HTMLAttributes;
      br: HTMLAttributes;
      hr: HTMLAttributes;
      header: HTMLAttributes;
      footer: HTMLAttributes;
      main: HTMLAttributes;
      nav: HTMLAttributes;
      section: HTMLAttributes;
      article: HTMLAttributes;
      aside: HTMLAttributes;
      details: HTMLAttributes;
      summary: HTMLAttributes;

      // Blogger native lowercase elements (for developers who prefer lowercase tag syntax)
      'b:section': HTMLAttributes & { id: string; class?: string; maxwidgets?: number | string; showaddelement?: boolean | string; growth?: string; preferred?: boolean | string };
      'b:widget': HTMLAttributes & { id: string; type: string; title?: string; locked?: boolean | string; pageType?: string; mobile?: string; version?: number | string; visible?: boolean | string };
      'b:widget-settings': HTMLAttributes;
      'b:widget-setting': HTMLAttributes & { name: string };
      'b:if': HTMLAttributes & { cond: string };
      'b:elseif': HTMLAttributes & { cond: string };
      'b:else': HTMLAttributes;
      'b:loop': HTMLAttributes & { values: string; var: string; index?: string };
      'b:include': HTMLAttributes & { name: string; data?: string; cond?: string };
      'b:includable': HTMLAttributes & { id: string; var?: string };
      'b:attr': HTMLAttributes & { name: string; value: string; 'expr:value'?: string; cond?: string };
      'b:class': HTMLAttributes & { name: string; cond: string };
      'b:tag': HTMLAttributes & { name?: string; cond?: string };
      'b:eval': HTMLAttributes & { expr: string };
      'b:with': HTMLAttributes & { var: string; value: string };
      'b:switch': HTMLAttributes & { var: string };
      'b:case': HTMLAttributes & { value: string };
      'b:default': HTMLAttributes;
      'b:message': HTMLAttributes & { name: string };
      'b:comment': HTMLAttributes;
      'b:template-skin': HTMLAttributes;
      'b:template-script': HTMLAttributes & { name: string; version: string; async?: boolean | string };
      'b:param': HTMLAttributes & { value?: string; 'expr:value'?: string };
      'b:defaultmarkup': HTMLAttributes & { type: string };
      'b:defaultmarkups': HTMLAttributes;

      // Dynamic tags fallback
      [elemName: string]: any;
    }
  }
}
