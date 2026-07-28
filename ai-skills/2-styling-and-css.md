# AI Skill 2: Styling and CSS Bundling

This guide explains how to apply styles, automatically compile inline CSS styling objects, and bundle external `.css` files into optimized template skins.

---

## 1. Inline CSS Object Compilation

Standard HTML uses inline styles as a string. However, when aligning with React's JSX syntax, inline styles are passed as nested JavaScript objects with camelCase keys.

The `@antinna/blogger-theme` serializer automatically:
- Resolves style objects (e.g. `style={{ marginTop: '10px', backgroundColor: '#fff', fontSize: 14 }}`).
- Converts camelCase keys to standard hyphenated/kebab-case CSS keys (`marginTop` -> `margin-top`).
- Automatically appends the `px` suffix to standard numeric values (e.g. `fontSize: 14` -> `font-size: 14px;`).
- Concatenates the rules into a single standard inline CSS style string.

### JSX Code
```tsx
const element = (
  <div style={{ color: 'red', marginTop: '15px', backgroundColor: '#ffffff', fontSize: 14 }}>
    Hello Styling!
  </div>
);
```

### Generated XML Output
```xml
<div style="color: red; margin-top: 15px; background-color: #ffffff; font-size: 14px;">Hello Styling!</div>
```

---

## 2. Dynamic Attribute Mapping

The compiler translates standard React-compatible camelCase JSX attribute names into their lowercase/hyphenated HTML/XML equivalent properties during render.

| JSX Property | Rendered XML |
| :--- | :--- |
| `className="..."` | `class="..."` |
| `htmlFor="..."` | `for="..."` |
| `tabIndex={1}` | `tabindex="1"` |
| `readOnly={true}` | `readonly="true"` |
| `maxLength={20}` | `maxlength="20"` |
| `noValidate={true}`| `novalidate="true"` |
| `autoFocus={true}` | `autofocus="true"` |

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
import { BSkin, BTemplateSkin } from '@antinna/blogger-theme';

const themeHead = [
  <title>My Professional Theme</title>,

  // Natively loads, bundles variables.css and main.css, minifies, and inlines:
  <BSkin css="./src/styles/main.css" />
];
```
