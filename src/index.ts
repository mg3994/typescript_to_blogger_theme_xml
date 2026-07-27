import './types/jsx.js';

export {
  escapeXml,
  Component,
  Text,
  RawText,
  DomComponent,
  Fragment,
  Renderer,
} from './core.js';

export {
  XmlComment,
  BSection,
  BWidgetSettings,
  BWidgetSetting,
  BWidget,
  BIf,
  BElseIf,
  BElse,
  BArg,
  BLoop,
  BData,
  BVariable,
  BGroup,
  BSkin,
  BInclude,
  BIncludable,
  BAttr,
  BClass,
  BTag,
  BEval,
  BWith,
  BSwitch,
  BCase,
  BDefault,
  BMessage,
  BComment,
  BTemplateSkin,
  BTemplateScript,
  BParam,
  BDefaultMarkup,
  BDefaultMarkups,
} from './blogger-components.js';

export {
  Html,
  Head,
  Body,
  Title,
  Meta,
  Link,
  Base,
  Div,
  Form,
  Details,
  Summary,
  Input,
  Button,
  Img,
  Br,
  Hr,
  Script,
  expr,
  Expr,
  Data,
  Feeds,
  Span,
  Header,
  Footer,
  Main,
  Nav,
  Section,
  Article,
  Aside,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Ul,
  Li,
  A,
  Label,
  Select,
  Option,
} from './html-components.js';

export { BClientScript } from './client-script.js';

export { BloggerTheme } from './theme-utility.js';

export { BloggerThemeValidator, ValidationError } from './devtool.js';

// Support JSX classic pragma
export { h, Fragment as jsxFragment } from './jsx-runtime.js';
