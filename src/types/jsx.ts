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

    // Standard Blogger enhancement wrapper that adds cond, children, and any expr: prefixed attribute to any type T
    type BloggerAttributes<T> = T & {
      children?: any;
      cond?: string;
      [exprAttr: `expr:${string}`]: any;
      [otherAttr: string]: any;
    };

    type DetailedHTMLProps<E, T> = BloggerAttributes<E>;

    interface HTMLAttributes<T = any> {
      id?: string;
      class?: string;
      className?: string;
      style?: any;
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

    interface AllHTMLAttributes<T = any> extends HTMLAttributes<T> {
      accept?: string;
      acceptCharset?: string;
      action?: string;
      allowFullScreen?: boolean;
      allowTransparency?: boolean;
      alt?: string;
      as?: string;
      async?: boolean;
      autoComplete?: string;
      autoPlay?: boolean;
      capture?: boolean | string;
      cellPadding?: number | string;
      cellSpacing?: number | string;
      charSet?: string;
      challenge?: string;
      checked?: boolean;
      cite?: string;
      classID?: string;
      cols?: number;
      colSpan?: number;
      controls?: boolean;
      coords?: string;
      crossOrigin?: string;
      data?: string;
      dateTime?: string;
      default?: boolean;
      defer?: boolean;
      disabled?: boolean;
      download?: any;
      encType?: string;
      form?: string;
      formAction?: string;
      formEncType?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      frameBorder?: number | string;
      headers?: string;
      height?: number | string;
      high?: number;
      href?: string;
      hrefLang?: string;
      htmlFor?: string;
      httpEquiv?: string;
      integrity?: string;
      keyParams?: string;
      keyType?: string;
      kind?: string;
      label?: string;
      list?: string;
      loop?: boolean;
      low?: number;
      manifest?: string;
      marginHeight?: number;
      marginWidth?: number;
      max?: number | string;
      maxLength?: number;
      media?: string;
      mediaGroup?: string;
      method?: string;
      min?: number | string;
      minLength?: number;
      multiple?: boolean;
      muted?: boolean;
      name?: string;
      noValidate?: boolean;
      open?: boolean;
      optimum?: number;
      pattern?: string;
      placeholder?: string;
      playsInline?: boolean;
      poster?: string;
      preload?: string;
      readOnly?: boolean;
      required?: boolean;
      reversed?: boolean;
      rows?: number;
      rowSpan?: number;
      sandbox?: string;
      scope?: string;
      scoped?: boolean;
      scrolling?: string;
      seamless?: boolean;
      selected?: boolean;
      shape?: string;
      size?: number;
      sizes?: string;
      span?: number;
      src?: string;
      srcDoc?: string;
      srcLang?: string;
      srcSet?: string;
      start?: number;
      step?: number | string;
      summary?: string;
      target?: string;
      type?: string;
      useMap?: string;
      value?: string | number;
      width?: number | string;
      wmode?: string;
      wrap?: string;
    }

    interface AnchorHTMLAttributes<T = any> extends HTMLAttributes<T> {
      download?: any;
      href?: string;
      hrefLang?: string;
      media?: string;
      ping?: string;
      target?: string;
      type?: string;
      referrerPolicy?: string;
    }

    interface AudioHTMLAttributes<T = any> extends MediaHTMLAttributes<T> {}

    interface AreaHTMLAttributes<T = any> extends HTMLAttributes<T> {
      alt?: string;
      coords?: string;
      download?: any;
      href?: string;
      hrefLang?: string;
      media?: string;
      referrerPolicy?: string;
      shape?: string;
      target?: string;
    }

    interface BaseHTMLAttributes<T = any> extends HTMLAttributes<T> {
      href?: string;
      target?: string;
    }

    interface BlockquoteHTMLAttributes<T = any> extends HTMLAttributes<T> {
      cite?: string;
    }

    interface ButtonHTMLAttributes<T = any> extends HTMLAttributes<T> {
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

    interface CanvasHTMLAttributes<T = any> extends HTMLAttributes<T> {
      height?: number | string;
      width?: number | string;
    }

    interface ColHTMLAttributes<T = any> extends HTMLAttributes<T> {
      span?: number;
      width?: number | string;
    }

    interface ColgroupHTMLAttributes<T = any> extends HTMLAttributes<T> {
      span?: number;
    }

    interface DataHTMLAttributes<T = any> extends HTMLAttributes<T> {
      value?: string | number;
    }

    interface DetailsHTMLAttributes<T = any> extends HTMLAttributes<T> {
      open?: boolean;
      name?: string;
    }

    interface DelHTMLAttributes<T = any> extends HTMLAttributes<T> {
      cite?: string;
      dateTime?: string;
    }

    interface DialogHTMLAttributes<T = any> extends HTMLAttributes<T> {
      open?: boolean;
    }

    interface EmbedHTMLAttributes<T = any> extends HTMLAttributes<T> {
      height?: number | string;
      src?: string;
      type?: string;
      width?: number | string;
    }

    interface FieldsetHTMLAttributes<T = any> extends HTMLAttributes<T> {
      disabled?: boolean;
      form?: string;
      name?: string;
    }

    interface FormHTMLAttributes<T = any> extends HTMLAttributes<T> {
      acceptCharset?: string;
      action?: string;
      autoComplete?: string;
      encType?: string;
      method?: string;
      name?: string;
      noValidate?: boolean;
      target?: string;
    }

    interface HtmlHTMLAttributes<T = any> extends HTMLAttributes<T> {
      manifest?: string;
    }

    interface IframeHTMLAttributes<T = any> extends HTMLAttributes<T> {
      allow?: string;
      allowFullScreen?: boolean;
      frameBorder?: number | string;
      height?: number | string;
      loading?: string;
      name?: string;
      referrerPolicy?: string;
      sandbox?: string;
      src?: string;
      srcDoc?: string;
      width?: number | string;
    }

    interface ImgHTMLAttributes<T = any> extends HTMLAttributes<T> {
      alt?: string;
      crossOrigin?: string;
      decoding?: string;
      height?: number | string;
      loading?: string;
      src?: string;
      srcSet?: string;
      useMap?: string;
      width?: number | string;
    }

    interface InsHTMLAttributes<T = any> extends HTMLAttributes<T> {
      cite?: string;
      dateTime?: string;
    }

    interface InputHTMLAttributes<T = any> extends HTMLAttributes<T> {
      accept?: string;
      alt?: string;
      autoComplete?: string;
      capture?: boolean | string;
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

    interface LabelHTMLAttributes<T = any> extends HTMLAttributes<T> {
      form?: string;
      htmlFor?: string;
    }

    interface LiHTMLAttributes<T = any> extends HTMLAttributes<T> {
      value?: string | number;
    }

    interface LinkHTMLAttributes<T = any> extends HTMLAttributes<T> {
      as?: string;
      crossOrigin?: string;
      href?: string;
      hrefLang?: string;
      integrity?: string;
      media?: string;
      sizes?: string;
      type?: string;
    }

    interface MapHTMLAttributes<T = any> extends HTMLAttributes<T> {
      name?: string;
    }

    interface MenuHTMLAttributes<T = any> extends HTMLAttributes<T> {
      type?: string;
    }

    interface MediaHTMLAttributes<T = any> extends HTMLAttributes<T> {
      autoPlay?: boolean;
      controls?: boolean;
      loop?: boolean;
      muted?: boolean;
      preload?: string;
      src?: string;
    }

    interface MetaHTMLAttributes<T = any> extends HTMLAttributes<T> {
      charSet?: string;
      content?: string;
      httpEquiv?: string;
      media?: string;
      name?: string;
    }

    interface MeterHTMLAttributes<T = any> extends HTMLAttributes<T> {
      form?: string;
      high?: number;
      low?: number;
      max?: number | string;
      min?: number | string;
      optimum?: number;
      value?: string | number;
    }

    interface QuoteHTMLAttributes<T = any> extends HTMLAttributes<T> {
      cite?: string;
    }

    interface ObjectHTMLAttributes<T = any> extends HTMLAttributes<T> {
      classID?: string;
      data?: string;
      form?: string;
      height?: number | string;
      name?: string;
      type?: string;
      useMap?: string;
      width?: number | string;
    }

    interface OlHTMLAttributes<T = any> extends HTMLAttributes<T> {
      reversed?: boolean;
      start?: number;
      type?: "1" | "a" | "A" | "i" | "I";
    }

    interface OptgroupHTMLAttributes<T = any> extends HTMLAttributes<T> {
      disabled?: boolean;
      label?: string;
    }

    interface OptionHTMLAttributes<T = any> extends HTMLAttributes<T> {
      disabled?: boolean;
      label?: string;
      selected?: boolean;
      value?: string | number;
    }

    interface OutputHTMLAttributes<T = any> extends HTMLAttributes<T> {
      form?: string;
      htmlFor?: string;
      name?: string;
    }

    interface ParamHTMLAttributes<T = any> extends HTMLAttributes<T> {
      name?: string;
      value?: string | number;
    }

    interface ProgressHTMLAttributes<T = any> extends HTMLAttributes<T> {
      max?: number | string;
      value?: string | number;
    }

    interface SlotHTMLAttributes<T = any> extends HTMLAttributes<T> {
      name?: string;
    }

    interface ScriptHTMLAttributes<T = any> extends HTMLAttributes<T> {
      async?: boolean;
      crossOrigin?: string;
      defer?: boolean;
      integrity?: string;
      noModule?: boolean;
      src?: string;
      type?: string;
    }

    interface SelectHTMLAttributes<T = any> extends HTMLAttributes<T> {
      autoComplete?: string;
      disabled?: boolean;
      form?: string;
      multiple?: boolean;
      name?: string;
      required?: boolean;
      size?: number;
      value?: string | number;
    }

    interface SourceHTMLAttributes<T = any> extends HTMLAttributes<T> {
      height?: number | string;
      media?: string;
      sizes?: string;
      src?: string;
      srcSet?: string;
      type?: string;
      width?: number | string;
    }

    interface StyleHTMLAttributes<T = any> extends HTMLAttributes<T> {
      media?: string;
      scoped?: boolean;
      type?: string;
    }

    interface TableHTMLAttributes<T = any> extends HTMLAttributes<T> {
      align?: "left" | "center" | "right";
      border?: number;
      cellPadding?: number | string;
      cellSpacing?: number | string;
      summary?: string;
      width?: number | string;
    }

    interface TextareaHTMLAttributes<T = any> extends HTMLAttributes<T> {
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

    interface TdHTMLAttributes<T = any> extends HTMLAttributes<T> {
      align?: "left" | "center" | "right" | "justify" | "char";
      colSpan?: number;
      headers?: string;
      rowSpan?: number;
      scope?: string;
    }

    interface ThHTMLAttributes<T = any> extends HTMLAttributes<T> {
      align?: "left" | "center" | "right" | "justify" | "char";
      colSpan?: number;
      headers?: string;
      rowSpan?: number;
      scope?: string;
    }

    interface TimeHTMLAttributes<T = any> extends HTMLAttributes<T> {
      dateTime?: string;
    }

    interface TrackHTMLAttributes<T = any> extends HTMLAttributes<T> {
      default?: boolean;
      kind?: string;
      label?: string;
      src?: string;
      srcLang?: string;
    }

    interface VideoHTMLAttributes<T = any> extends HTMLAttributes<T> {
      height?: number | string;
      playsInline?: boolean;
      poster?: string;
      width?: number | string;
    }

    interface SVGAttributes<T = any> {
      className?: string;
      color?: string;
      height?: number | string;
      id?: string;
      lang?: string;
      max?: number | string;
      media?: string;
      method?: string;
      min?: number | string;
      name?: string;
      style?: any;
      target?: string;
      type?: string;
      width?: number | string;
      viewBox?: string;
      [attributeName: string]: any;
    }

    interface IntrinsicElements {
      // Standard HTML elements (fully wrapped in BloggerAttributes for expr: prefixes)
      a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
      article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      aside: DetailedHTMLProps<HTMLAttributes, HTMLElement>;
      audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
      b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
      bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
      body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
      br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
      caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      center: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
      colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
      data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>;
      datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
      dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      del: DetailedHTMLProps<DelHTMLAttributes<HTMLModElement>, HTMLModElement>;
      details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement>;
      dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
      div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
      dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
      fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
      figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
      header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
      html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
      i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
      img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
      kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      keygen: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
      legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
      li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
      main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
      mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>;
      menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
      meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>;
      nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
      ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
      optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
      option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
      output: DetailedHTMLProps<HTMLAttributes<HTMLOutputElement>, HTMLOutputElement>;
      p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
      picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
      progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
      q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
      rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      search: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      slot: DetailedHTMLProps<SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>;
      script: DetailedHTMLProps<ScriptHTMLAttributes & { contentInCDATA?: boolean }, HTMLScriptElement>;
      section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
      span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
      sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
      template: DetailedHTMLProps<HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>;
      tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
      textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
      thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      time: DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>;
      title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
      tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
      track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
      u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
      wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

      // SVG (fully wrapped in BloggerAttributes)
      svg: BloggerAttributes<SVGAttributes<SVGSVGElement>>;

      // Blogger native elements (fully wrapped in BloggerAttributes for expr: prefixes)
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
