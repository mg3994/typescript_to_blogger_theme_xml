import * as React from 'react';

// Augmented JSX namespace for Blogger templates that can be used directly or within standard React JSX workflows.
declare global {
  namespace JSX {
    // We can define custom element interfaces for standard Blogger XML elements
    interface IntrinsicElements {
      'b:section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        id: string;
        class?: string;
        maxwidgets?: number | string;
        showaddelement?: boolean | string;
        growth?: string;
        preferred?: boolean | string;
        cond?: string;
        [exprAttr: `expr:${string}`]: any;
      }, HTMLElement>;

      'b:widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        id: string;
        type: string;
        title?: string;
        locked?: boolean | string;
        pageType?: string;
        mobile?: string;
        version?: number | string;
        visible?: boolean | string;
        cond?: string;
        [exprAttr: `expr:${string}`]: any;
      }, HTMLElement>;

      'b:widget-settings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'b:widget-setting': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string }, HTMLElement>;

      'b:if': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { cond: string }, HTMLElement>;
      'b:elseif': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { cond: string }, HTMLElement>;
      'b:else': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      'b:loop': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        values: string;
        var: string;
        index?: string;
      }, HTMLElement>;

      'b:include': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name: string;
        data?: string;
        cond?: string;
      }, HTMLElement>;

      'b:includable': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        id: string;
        var?: string;
      }, HTMLElement>;

      'b:attr': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name: string;
        value: string;
        cond?: string;
      }, HTMLElement>;

      'b:class': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name: string;
        cond: string;
      }, HTMLElement>;

      'b:tag': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name?: string;
        cond?: string;
      }, HTMLElement>;

      'b:eval': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { expr: string }, HTMLElement>;

      'b:with': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        var: string;
        value: string;
      }, HTMLElement>;

      'b:switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { var: string }, HTMLElement>;
      'b:case': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { value: string }, HTMLElement>;
      'b:default': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      'b:message': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string }, HTMLElement>;
      'b:comment': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      'b:template-skin': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'b:template-script': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name: string;
        version: string;
        async?: boolean | string;
      }, HTMLElement>;

      'b:param': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { value?: string }, HTMLElement>;

      'b:defaultmarkup': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type: string }, HTMLElement>;
      'b:defaultmarkups': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Extends any HTML/SVG/Blogger elements with Blogger specific structural helper attributes
export type WithBloggerAttributes<T> = T & {
  cond?: string;
  [exprAttr: `expr:${string}`]: any;
};

// DRY helper to augment standard react attributes
export interface BloggerReactProps extends React.HTMLAttributes<any> {
  cond?: string;
  [exprAttr: `expr:${string}`]: any;
}
