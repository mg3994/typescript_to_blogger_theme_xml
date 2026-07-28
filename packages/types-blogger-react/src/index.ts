import * as React from 'react';
import * as CSS from 'csstype';

// Export CSS namespace for direct utility use in standard projects
export { CSS };

// Augment React attributes to support Blogger conditional logic, expression binding, and rich CSS inline properties natively!
declare module 'react' {
  interface HTMLAttributes<T> {
    cond?: string;
    style?: React.CSSProperties;
    [exprAttr: `expr:${string}`]: any;
  }
  interface SVGAttributes<T> {
    cond?: string;
    style?: React.CSSProperties;
    [exprAttr: `expr:${string}`]: any;
  }
}

// Augment the global JSX namespace so Blogger tags can be used in standard React components cleanly
declare global {
  namespace JSX {
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

// Local JSX namespace for custom compilation
export namespace JSX {
  export type Element = React.JSX.Element;

  // Accept both React Components and blogger-theme Component classes
  export interface ElementClass {
    props?: any;
    render?(): any;
    build?(): any;
    setState?(state: any, callback?: () => void): void;
    forceUpdate?(callback?: () => void): void;
    state?: any;
    context?: any;
  }

  export type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
  export type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
  export type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  export type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
  export type IntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>;

  // Inherit standard React elements and merge Blogger specific tags!
  export interface IntrinsicElements extends React.JSX.IntrinsicElements {
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

    // Dynamic tag fallback
    [elemName: string]: any;
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
