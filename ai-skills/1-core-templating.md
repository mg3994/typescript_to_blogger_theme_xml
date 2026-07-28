# AI Skill 1: Core Declarative Templating with `@antinna/blogger-theme`

This guide explains how AI agents and developers can build Blogger XML templates using the declarative component tree API, utilizing standard React components, JSX/TSX, and the modern React DOM server rendering target.

---

## 1. React-First Architecture

In `@antinna/blogger-theme`, we treat Blogger purely as another **rendering target of React**. Writing Blogger layouts feels exactly like writing a standard React server-rendered application.

### Basic Setup
Use standard React components to declare your templates:
```tsx
import React from 'react';
import { renderToBloggerTheme, BSection, BWidget } from '@antinna/blogger-theme';

const themeLayout = (
  <div id="wrapper-pane">
    <BSection id="header-area" maxwidgets={1}>
      <BWidget id="Header1" type="Header" />
    </BSection>
  </div>
);

const xml = renderToBloggerTheme(themeLayout);
```

---

## 2. Automatic XML Character Escaping (NCR)

The library includes a strict XML post-processor that:
1. Escapes standard XML characters: `&`, `<`, `>`, `"`, `'`.
2. Strips XML 1.0 restricted control characters (C0 and C1 control blocks).
3. Automatically converts non-ASCII Unicode characters/symbols into safe hexadecimal Numeric Character References (NCRs, e.g. `&#x...;`), preventing encoding errors in Blogger's legacy layout parser.

---

## 3. Blogger-Specific React Components

All custom Blogger elements are implemented as standard React functional/class components.

| Component Name | XML Tag Name | Key Props |
| :--- | :--- | :--- |
| `BSection` | `<b:section>` | `id` (required), `maxwidgets`, `showaddelement` (`yes`/`no`), `growth`, `preferred` |
| `BWidget` | `<b:widget>` | `id` (required), `type` (required), `title`, `locked`, `pageType`, `mobile`, `version`, `visible` |
| `BIncludable` | `<b:includable>` | `id` (required), `var` |
| `BInclude` | `<b:include>` | `name` (required), `data`, `cond` |
| `BIf`, `BElseIf`, `BElse` | `<b:if>`, `<b:elseif>`, `<b:else>` | `cond` (required for If/ElseIf) |
| `BLoop` | `<b:loop>` | `values` (required), `var` (required), `index` |
| `BData` | `<data:.../>` | `value` (required) |
| `BEval` | `<b:eval>` | `expr` (required) |
| `BWith` | `<b:with>` | `var` (required), `value` (required) |

### Modern Layout in TSX
```tsx
import React from 'react';
import { BSection, BWidget, BIncludable, BIf, BData, Expr } from '@antinna/blogger-theme';

export function BlogLayout() {
  return (
    <BSection id="main-content" maxwidgets={2} showaddelement={true}>
      <BWidget id="Blog1" type="Blog">
        <BIncludable id="main">
          <BIf cond="data:view.isPost">
            <article className="post-item">
              <h1 expr:title="data:post.title">
                <BData value="post.title" />
              </h1>
              <div className="post-content">
                <BData value="post.body" />
              </div>
            </article>
          </BIf>
        </BIncludable>
      </BWidget>
    </BSection>
  );
}
```

---

## 4. Expressions & Mappings (`Expr`)

Blogger templates make extensive use of dynamic expression bindings using prefix attributes (e.g. `expr:href`, `expr:class`). The library provides the `Expr` helper class to build standard Blogger expressions quickly.

| Method | Syntax Example | Result |
| :--- | :--- | :--- |
| `Expr.get(path)` | `Expr.get('post.url')` | `"data:post.url"` |
| `Expr.attr(name, val)`| `Expr.attr('class', 'data:post.class')` | `{"expr:class": "data:post.class"}` |
| `Expr.resizeImage(...)`| `Expr.resizeImage(url, 400, "1:1")` | `"resizeImage(url, 400, \"1:1\", \"true\")"` |
| `Expr.and(a, b)` | `Expr.and('data:view.isPost', 'data:post.allowComments')` | `"(data:view.isPost) and (data:post.allowComments)"` |
| `Expr.or(a, b)` | `Expr.or('data:view.isHomepage', 'data:view.isArchive')` | `"(data:view.isHomepage) or (data:view.isArchive)"` |
| `Expr.not(cond)` | `Expr.not('data:view.isError')` | `"not (data:view.isError)"` |
| `Expr.eq(a, b)` | `Expr.eq('data:blog.pageType', '"item"')` | `"(data:blog.pageType) == (\"item\")"` |
