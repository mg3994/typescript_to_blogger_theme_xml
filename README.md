# 🚀 blogger-theme (TypeScript)

A lightweight TypeScript & ESNext library for generating Blogger (Blogspot) theme XML using a clean, declarative component API with full TSX/JSX and Builder support.

Inspired by the Dart library `blogger_theme`, this package enables writing highly modular, extensible Blogger themes with TypeScript.

---

## Features

- **Declarative theme authoring** in TypeScript using custom TSX/JSX elements or native Builder classes.
- **Dual API Support (Option C):** Use standard OOP constructors (`new BSection(...)`), functional builders, or standard TSX layouts.
- **XML-Safe rendering:** Automatic XML entity escaping and removal of XML 1.0 control characters.
- **TypeScript 5+ and ESNext-native:** Fully typed, clean, modern ES module structure.
- **On-Demand client script compilation:** Compile, bundle, and minify client-side TypeScript/JavaScript to self-invoking IIFEs inside Blogger templates using `esbuild` at render-time.
- **Direct rendering:** Directly render any component using `.render()`.

---

## Installation

```bash
npm install blogger-theme
```

Make sure you have `esbuild` installed (which is a peer dependency used for on-demand script compilation).

---

## tsconfig.json Setup

To use TSX/JSX syntax in your project, configure your `tsconfig.json` with the automatic JSX runtime:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "react-jsx",
    "jsxImportSource": "blogger-theme",
    "strict": true
  }
}
```

---

## Quick Start

### 1. Define your Layout Component (TSX Style)

```tsx
import { BSection, BWidget, BIf, BData } from 'blogger-theme';

export const BlogLayout = () => (
  <div class="wrapper-pane">
    <BSection id="header-area" className="header-section" maxwidgets={1} showaddelement={true}>
      <BWidget id="Header1" type="Header" title="Blog Header Title" locked={true} />
    </BSection>

    <BIf cond="data:view.isPost">
      <div class="post-item">
        <BData value="post.body" />
      </div>
    </BIf>
  </div>
);
```

### 2. Generate Blogger Theme XML

```tsx
import { BloggerTheme, Title, BSkin } from 'blogger-theme';
import { BlogLayout } from './BlogLayout.js';

const theme = new BloggerTheme({
  attributes: {
    'b:responsive': 'true',
    'b:defaultwidgetversion': '2',
    'b:layoutsversion': '3',
  },
  head: [
    <Title>My Modern Blogger Theme</Title>,
    <BSkin css="body { font-family: sans-serif; background: #fafafa; }" />
  ],
  body: [
    <BlogLayout />
  ]
});

const xml = theme.generate();
console.log(xml);
```

---

## Dual API: Builder Style vs JSX

This library has been meticulously designed to support **both** styles natively.

### Constructor/Builder Style

If you prefer class-based instantiation matching the original Dart package:

```typescript
import { BSection, BWidget, BIf, Div, BData } from 'blogger-theme';

const layout = new Div({ class: 'wrapper-pane' },
  new BSection({
    id: 'header-area',
    className: 'header-section',
    maxwidgets: 1,
    showaddelement: true,
  },
    new BWidget({
      id: 'Header1',
      type: 'Header',
      title: 'Blog Header Title',
      locked: true,
    })
  ),
  new BIf({ cond: 'data:view.isPost' },
    new Div({ class: 'post-item' },
      new BData('post.body')
    )
  )
);

const xml = layout.render();
```

---

## Client-Side Script Bundling (`BClientScript`)

You can compile a client-side TypeScript or JavaScript file at render-time. This code will be bundled, minified, wrapped inside a self-invoking IIFE, and output directly inside the rendered theme XML's `<script>` tag.

```tsx
import { BClientScript } from 'blogger-theme';

// Inside your layout/head:
<BClientScript scriptPath="./src/client/analytics.ts" contentInCDATA={true} />
```

---

## API Overview

### Core building blocks

- `Component`: Abstract base class for all nodes. Includes direct `.render()` method.
- `DomComponent`: Standard element with custom tag, attributes, and children.
- `Text`: Normal text node (XML escaped by default).
- `RawText`: Raw text node (disables XML escaping).
- `Fragment`: Group components without adding a parent tag.
- `Renderer`: Compiles component trees into XML strings.

### Blogger-specific components

- `BSection`, `BWidget`, `BWidgetSettings`, `BWidgetSetting`
- `BIf`, `BElseIf`, `BElse`
- `BLoop`, `BData`, `BArg`, `BAttr`, `BClass`
- `BInclude`, `BIncludable`, `BTag`, `BEval`
- `BSkin`, `BVariable`, `BGroup`
- `BComment`, `XmlComment`, `BTemplateSkin`, `BTemplateScript`, `BParam`
- `BDefaultMarkup`, `BDefaultMarkups`

### HTML helper components

- `Html`, `Head`, `Body`, `Title`, `Meta`, `Link`, `Base`
- `Div`, `Span`, `P`, `Form`, `Input`, `Button`, `Img`, `Br`, `Hr`
- `Header`, `Footer`, `Main`, `Nav`, `Section`, `Article`, `Aside`
- `H1`, `H2`, `H3`, `H4`, `H5`, `H6`
- `Ul`, `Li`, `A`, `Label`, `Select`, `Option`, `Script`

---

## License

MIT License.
