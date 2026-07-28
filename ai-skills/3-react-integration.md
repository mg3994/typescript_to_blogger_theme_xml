# AI Skill 3: React 19 Integration & Code Bundling

This guide explains how developers can build a full-scale React 19 application, bundle it, and embed it dynamically into a Blogger layout using standard React DOM Server rendering and `BClientScript`.

---

## 1. Clean React Namespace Alignment

The new architecture is built **100% on top of React 19**.
- We use the standard React `JSX` namespace natively.
- No local custom JSX runtimes are required, completely avoiding any JSX name collisions or type resolution problems.
- Standard React features (such as Context, Hooks, Suspense, Portals, Fragments, and standard functional/class components) are fully supported natively.

---

## 2. Shared DRY Types with `@antinna/types-blogger-react`

When building mixed workspaces (a React application running side-by-side with a Blogger TSX layout template compiler), developers can use `@antinna/types-blogger-react`.

This package:
1. Decouples typings to avoid code repetition.
2. Extends `@types/react` and `@types/react-dom` using TypeScript declaration merging.
3. Automatically enables React HTML and SVG attributes to support Blogger Specific attributes like `cond` and `expr:*` without type errors.
4. Integrates standard `csstype` support for type-safe CSS inline styles.

---

## 3. On-Demand App Bundling with `BClientScript`

The `BClientScript` component is used to embed client-side JS or TS logic (including full React apps) into standard HTML `<script>` tags.

At render time, `BClientScript`:
1. Launches `esbuild` synchronously.
2. Bundles the target entry point (resolving all TS/JS imports, React, and other NPM packages recursively).
3. Minifies the output.
4. Wraps it inside a self-invoking IIFE block.
5. Inlines the result inside CDATA script wrappers.

### embedding React inside Blogger TSX
```tsx
import React from 'react';
import { BClientScript } from '@antinna/blogger-theme';

export function Layout() {
  return (
    <main>
      {/* React will mount here on the client-side */}
      <div id="react-root"></div>

      {/* Dynamically compiles, bundles, and embeds the client application on-demand */}
      <BClientScript scriptPath="./src/index.tsx" mode="cdata" />
    </main>
  );
}
```
