# AI Skill 2: Styling and CSS Bundling

This guide explains how standard React-first styling is handled, compiled, and optimized into Blogger-compatible outputs.

---

## 1. Inline CSS Object Compilation

Standard React DOM Server natively converts styling objects (passed via `style={{ ... }}`) into standard inline style attributes, making camelCase properties like `marginTop: '15px'` render as standard lowercase, hyphenated CSS definitions!

Our engine natively supports this standard React behavior, rendering standard styling objects without any custom parser hacks.

### React TSX
```tsx
const element = (
  <div style={{ color: 'red', marginTop: '15px', backgroundColor: '#ffffff', fontSize: 14 }}>
    Hello Styling!
  </div>
);
```

### Generated XML Output
```xml
<div style="color:red;margin-top:15px;background-color:#ffffff;font-size:14px">Hello Styling!</div>
```

---

## 2. Dynamic Attribute Mapping

React DOM Server natively translates standard React attribute names (like `className` and `htmlFor`) to standard XHTML `class` and `for` attributes.
Additionally, our post-processor maps any React camelCase elements (like `noValidate`, `readOnly`, `maxLength`, `tabIndex`, `autoFocus`) into standard lowercase XHTML attributes perfectly.

| React JSX Property | Rendered XML |
| :--- | :--- |
| `className="..."` | `class="..."` |
| `htmlFor="..."` | `for="..."` |
| `tabIndex={1}` | `tabindex="1"` |
| `readOnly={true}` | `readonly=""` |
| `maxLength={20}` | `maxlength="20"` |
| `noValidate={true}`| `novalidate=""` |
| `autoFocus={true}` | `autofocus=""` |

---

## 3. Automated External CSS Bundling

Writing inline CSS can be repetitive and hard to maintain. To support clean developer organization, the `BSkin` and `BTemplateSkin` components natively support **external `.css` file loading and bundling**.

If a `.css` file path is passed as the parameter, the component will:
1. Resolve the absolute path of the stylesheet.
2. Call `esbuild` under the hood to fully compile, bundle (resolving `@import` rules recursively), and minify the CSS contents.
3. Automatically inline the minified, optimized CSS output inside the template skin CDATA.

### Directory Setup
```
src/
  ├── layouts/
  │    └── main.tsx
  └── styles/
       ├── variables.css
       └── main.css   <-- contains @import "./variables.css"
```

### Layout TSX
```tsx
import React from 'react';
import { BSkin, BTemplateSkin } from '@antinna/blogger-theme';

const themeHead = [
  <title key="title">My Professional Theme</title>,

  // Natively loads, bundles variables.css and main.css, minifies, and inlines:
  <BSkin key="skin" css="./src/styles/main.css" />
];
```
