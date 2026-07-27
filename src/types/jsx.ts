import { Component } from '../core.js';

declare global {
  namespace JSX {
    interface Element extends Component {}
    interface ElementClass {
      props?: any;
    }

    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }

    type Booleanish = boolean | "true" | "false";

    // A general wrapper for Blogger attributes that adds Blogger-specific 'cond',
    // children support, and dynamic 'expr:' expressions for any attribute.
    type BloggerAttributes<T> = T & {
      children?: any;
      cond?: string;
      [exprAttr: `expr:${string}`]: any;
      [otherAttr: string]: any;
    };

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

      // Blogger conditional rendering attribute on standard HTML tags
      cond?: string;

      // Enable children for JSX nests
      children?: any;

      // blogger expression attributes dynamically allowed on any standard HTML element
      [exprAttr: `expr:${string}`]: any;

      // General fallback attribute indexer
      [attributeName: string]: any;
    }

    type DetailedHTMLProps<E, T> = E;

    interface AnchorHTMLAttributes extends HTMLAttributes {
      download?: any;
      href?: string;
      hrefLang?: string;
      media?: string;
      target?: string;
      type?: string;
    }

    interface AudioHTMLAttributes extends HTMLAttributes {
      autoPlay?: boolean;
      controls?: boolean;
      loop?: boolean;
      muted?: boolean;
      preload?: string;
      src?: string;
    }

    interface ButtonHTMLAttributes extends HTMLAttributes {
      disabled?: boolean;
      form?: string;
      formAction?: string;
      formEncType?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      name?: string;
      type?: "submit" | "reset" | "button";
      value?: string | number;
    }

    interface CanvasHTMLAttributes extends HTMLAttributes {
      height?: number | string;
      width?: number | string;
    }

    interface FormHTMLAttributes extends HTMLAttributes {
      acceptCharset?: string;
      action?: string;
      autoComplete?: string;
      encType?: string;
      method?: string;
      name?: string;
      noValidate?: boolean;
      target?: string;
    }

    interface HtmlHTMLAttributes extends HTMLAttributes {
      manifest?: string;
    }

    interface IframeHTMLAttributes extends HTMLAttributes {
      allow?: string;
      allowFullScreen?: boolean;
      height?: number | string;
      name?: string;
      sandbox?: string;
      src?: string;
      srcDoc?: string;
      width?: number | string;
    }

    interface ImgHTMLAttributes extends HTMLAttributes {
      alt?: string;
      crossOrigin?: "anonymous" | "use-credentials" | "";
      decoding?: "async" | "auto" | "sync";
      height?: number | string;
      loading?: "eager" | "lazy";
      src?: string;
      srcSet?: string;
      useMap?: string;
      width?: number | string;
    }

    interface InputHTMLAttributes extends HTMLAttributes {
      accept?: string;
      alt?: string;
      autoComplete?: string;
      checked?: boolean;
      disabled?: boolean;
      form?: string;
      formAction?: string;
      formEncType?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      height?: number | string;
      list?: string;
      max?: number | string;
      maxLength?: number;
      min?: number | string;
      minLength?: number;
      multiple?: boolean;
      name?: string;
      pattern?: string;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      size?: number;
      src?: string;
      step?: number | string;
      type?: string;
      value?: string | number;
      width?: number | string;
    }

    interface LabelHTMLAttributes extends HTMLAttributes {
      form?: string;
      htmlFor?: string;
    }

    interface LinkHTMLAttributes extends HTMLAttributes {
      as?: string;
      crossOrigin?: string;
      href?: string;
      hrefLang?: string;
      integrity?: string;
      media?: string;
      rel?: string;
      sizes?: string;
      type?: string;
    }

    interface MetaHTMLAttributes extends HTMLAttributes {
      charSet?: string;
      content?: string;
      httpEquiv?: string;
      name?: string;
    }

    interface OlHTMLAttributes extends HTMLAttributes {
      reversed?: boolean;
      start?: number;
      type?: "1" | "a" | "A" | "i" | "I";
    }

    interface OptionHTMLAttributes extends HTMLAttributes {
      disabled?: boolean;
      label?: string;
      selected?: boolean;
      value?: string | number;
    }

    interface ScriptHTMLAttributes extends HTMLAttributes {
      async?: boolean;
      crossOrigin?: string;
      defer?: boolean;
      integrity?: string;
      noModule?: boolean;
      src?: string;
      type?: string;
    }

    interface SelectHTMLAttributes extends HTMLAttributes {
      autoComplete?: string;
      disabled?: boolean;
      form?: string;
      multiple?: boolean;
      name?: string;
      required?: boolean;
      size?: number;
      value?: string | number;
    }

    interface StyleHTMLAttributes extends HTMLAttributes {
      media?: string;
      scoped?: boolean;
      type?: string;
    }

    interface TextareaHTMLAttributes extends HTMLAttributes {
      autoComplete?: string;
      cols?: number;
      disabled?: boolean;
      form?: string;
      maxLength?: number;
      minLength?: number;
      name?: string;
      placeholder?: string;
      readOnly?: boolean;
      required?: boolean;
      rows?: number;
      value?: string | number;
      wrap?: string;
    }

    interface VideoHTMLAttributes extends HTMLAttributes {
      autoPlay?: boolean;
      controls?: boolean;
      height?: number | string;
      loop?: boolean;
      muted?: boolean;
      poster?: string;
      src?: string;
      width?: number | string;
    }

    interface IntrinsicElements {
      // Standard HTML elements
      a: DetailedHTMLProps<AnchorHTMLAttributes, HTMLAnchorElement>;
      abbr: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      address: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      area: DetailedHTMLProps<HTMLAttributes, HTMLAreaElement>;
      article: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      aside: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      audio: DetailedHTMLProps<AudioHTMLAttributes, HTMLAudioElement>;
      b: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      base: DetailedHTMLProps<HTMLAttributes, HTMLBaseElement>;
      bdi: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      bdo: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      big: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      blockquote: DetailedHTMLProps<HTMLAttributes, HTMLQuoteElement>;
      body: DetailedHTMLProps<HTMLAttributes, HTMLBodyElement>;
      br: DetailedHTMLProps<HTMLAttributes, HTMLBRElement>;
      button: DetailedHTMLProps<ButtonHTMLAttributes, HTMLButtonElement>;
      canvas: DetailedHTMLProps<CanvasHTMLAttributes, HTMLCanvasElement>;
      caption: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      center: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      cite: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      code: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      col: DetailedHTMLProps<HTMLAttributes, HTMLTableColElement>;
      colgroup: DetailedHTMLProps<HTMLAttributes, HTMLTableColElement>;
      data: DetailedHTMLProps<HTMLAttributes, HTMLDataElement>;
      datalist: DetailedHTMLProps<HTMLAttributes, HTMLDataListElement>;
      dd: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      del: DetailedHTMLProps<HTMLAttributes, HTMLModElement>;
      details: DetailedHTMLProps<HTMLAttributes, HTMLDetailsElement>;
      dfn: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      dialog: DetailedHTMLProps<HTMLAttributes, HTMLDialogElement>;
      div: DetailedHTMLProps<HTMLAttributes, HTMLDivElement>;
      dl: DetailedHTMLProps<HTMLAttributes, HTMLDListElement>;
      dt: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      em: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      embed: DetailedHTMLProps<HTMLAttributes, HTMLEmbedElement>;
      fieldset: DetailedHTMLProps<HTMLAttributes, HTMLFieldSetElement>;
      figcaption: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      figure: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      footer: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      form: DetailedHTMLProps<FormHTMLAttributes, HTMLFormElement>;
      h1: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      h2: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      h3: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      h4: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      h5: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      h6: DetailedHTMLProps<HTMLAttributes, HTMLHeadingElement>;
      head: DetailedHTMLProps<HTMLAttributes, HTMLHeadElement>;
      header: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      hgroup: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      hr: DetailedHTMLProps<HTMLAttributes, HTMLHRElement>;
      html: DetailedHTMLProps<HtmlHTMLAttributes, HTMLHtmlElement>;
      i: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      iframe: DetailedHTMLProps<IframeHTMLAttributes, HTMLIFrameElement>;
      img: DetailedHTMLProps<ImgHTMLAttributes, HTMLImageElement>;
      input: DetailedHTMLProps<InputHTMLAttributes, HTMLInputElement>;
      ins: DetailedHTMLProps<HTMLAttributes, HTMLModElement>;
      kbd: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      keygen: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      label: DetailedHTMLProps<LabelHTMLAttributes, HTMLLabelElement>;
      legend: DetailedHTMLProps<HTMLAttributes, HTMLLegendElement>;
      li: DetailedHTMLProps<HTMLAttributes, HTMLLIElement>;
      link: DetailedHTMLProps<LinkHTMLAttributes, HTMLLinkElement>;
      main: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      map: DetailedHTMLProps<HTMLAttributes, HTMLMapElement>;
      mark: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      menu: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      menuitem: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      meta: DetailedHTMLProps<MetaHTMLAttributes, HTMLMetaElement>;
      meter: DetailedHTMLProps<HTMLAttributes, HTMLMeterElement>;
      nav: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      noscript: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      object: DetailedHTMLProps<HTMLAttributes, HTMLObjectElement>;
      ol: DetailedHTMLProps<OlHTMLAttributes, HTMLOListElement>;
      optgroup: DetailedHTMLProps<HTMLAttributes, HTMLOptGroupElement>;
      option: DetailedHTMLProps<OptionHTMLAttributes, HTMLOptionElement>;
      output: DetailedHTMLProps<HTMLAttributes, HTMLOutputElement>;
      p: DetailedHTMLProps<HTMLAttributes, HTMLParagraphElement>;
      param: DetailedHTMLProps<HTMLAttributes, HTMLParamElement>;
      picture: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      pre: DetailedHTMLProps<HTMLAttributes, HTMLPreElement>;
      progress: DetailedHTMLProps<HTMLAttributes, HTMLProgressElement>;
      q: DetailedHTMLProps<HTMLAttributes, HTMLQuoteElement>;
      rp: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      rt: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      ruby: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      s: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      samp: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      search: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      slot: DetailedHTMLProps<HTMLAttributes, HTMLSlotElement>;
      script: DetailedHTMLProps<ScriptHTMLAttributes & { contentInCDATA?: boolean }, HTMLScriptElement>;
      section: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      select: DetailedHTMLProps<SelectHTMLAttributes, HTMLSelectElement>;
      small: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      source: DetailedHTMLProps<HTMLAttributes, HTMLSourceElement>;
      span: DetailedHTMLProps<HTMLAttributes, HTMLSpanElement>;
      strong: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      style: DetailedHTMLProps<StyleHTMLAttributes, HTMLStyleElement>;
      sub: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      summary: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      sup: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      table: DetailedHTMLProps<HTMLAttributes, HTMLTableElement>;
      template: DetailedHTMLProps<HTMLAttributes, HTMLTemplateElement>;
      tbody: DetailedHTMLProps<HTMLAttributes, HTMLTableSectionElement>;
      td: DetailedHTMLProps<HTMLAttributes, HTMLTableDataCellElement>;
      textarea: DetailedHTMLProps<TextareaHTMLAttributes, HTMLTextAreaElement>;
      tfoot: DetailedHTMLProps<HTMLAttributes, HTMLTableSectionElement>;
      th: DetailedHTMLProps<HTMLAttributes, HTMLTableHeaderCellElement>;
      thead: DetailedHTMLProps<HTMLAttributes, HTMLTableSectionElement>;
      time: DetailedHTMLProps<HTMLAttributes, HTMLTimeElement>;
      title: DetailedHTMLProps<HTMLAttributes, HTMLTitleElement>;
      tr: DetailedHTMLProps<HTMLAttributes, HTMLTableRowElement>;
      track: DetailedHTMLProps<HTMLAttributes, HTMLTrackElement>;
      u: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      ul: DetailedHTMLProps<HTMLAttributes, HTMLUListElement>;
      var: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      video: DetailedHTMLProps<VideoHTMLAttributes, HTMLVideoElement>;
      wbr: DetailedHTMLProps<HTMLAttributes, HTMLElement>;

      // Blogger native elements
      'b:section': BloggerAttributes<{ id: string; class?: string; maxwidgets?: number | string; showaddelement?: boolean | string; growth?: string; preferred?: boolean | string }>;
      'b:widget': BloggerAttributes<{ id: string; type: string; title?: string; locked?: boolean | string; pageType?: string; mobile?: string; version?: number | string; visible?: boolean | string }>;
      'b:widget-settings': BloggerAttributes<{}>;
      'b:widget-setting': BloggerAttributes<{ name: string }>;
      'b:if': BloggerAttributes<{ cond: string }>;
      'b:elseif': BloggerAttributes<{ cond: string }>;
      'b:else': BloggerAttributes<{}>;
      'b:loop': BloggerAttributes<{ values: string; var: string; index?: string }>;
      'b:include': BloggerAttributes<{ name: string; data?: string; cond?: string }>;
      'b:includable': BloggerAttributes<{ id: string; var?: string }>;
      'b:attr': BloggerAttributes<{ name: string; value: string; 'expr:value'?: string; cond?: string }>;
      'b:class': BloggerAttributes<{ name: string; cond: string }>;
      'b:tag': BloggerAttributes<{ name?: string; cond?: string }>;
      'b:eval': BloggerAttributes<{ expr: string }>;
      'b:with': BloggerAttributes<{ var: string; value: string }>;
      'b:switch': BloggerAttributes<{ var: string }>;
      'b:case': BloggerAttributes<{ value: string }>;
      'b:default': BloggerAttributes<{}>;
      'b:message': BloggerAttributes<{ name: string }>;
      'b:comment': BloggerAttributes<{}>;
      'b:template-skin': BloggerAttributes<{}>;
      'b:template-script': BloggerAttributes<{ name: string; version: string; async?: boolean | string }>;
      'b:param': BloggerAttributes<{ value?: string; 'expr:value'?: string }>;
      'b:defaultmarkup': BloggerAttributes<{ type: string }>;
      'b:defaultmarkups': BloggerAttributes<{}>;

      // Dynamic tags fallback
      [elemName: string]: any;
    }
  }
}
