# AI Skill 1: Core Declarative Templating with `@antinna/blogger-theme`

This guide explains how AI agents and developers can build Blogger XML templates using the declarative component tree API, utilizing both programmatic structures and TSX.

---

## 1. Declarative DOM Components

In `@antinna/blogger-theme`, all HTML and custom tags are represented as nodes extending the `Component` class. Standard HTML elements can be declared via the `DomComponent` constructor, or using standard lowercase TSX tags.

### Programmatic Component Tree
```typescript
import { DomComponent, Text, RawText } from '@antinna/blogger-theme';

const container = new DomComponent('div', { class: 'container', id: 'main' },
  new DomComponent('span', null, new Text('Hello & Welcome!')),
  new DomComponent('p', null, new RawText('<span>Unescaped Raw Content</span>'))
);

const xmlOutput = container.render();
// Output: <div class="container" id="main"><span>Hello &amp; Welcome!</span><p><span>Unescaped Raw Content</span></p></div>
```

---

## 2. Automatic XML Character Escaping (NCR)

The library has a strict, built-in XML serialization engine that:
1. Escapes standard XML characters: `&`, `<`, `>`, `"`, `'`.
2. Strips XML 1.0 restricted control characters (C0 and C1 control blocks).
3. Automatically converts non-ASCII Unicode characters/symbols into safe hexadecimal Numeric Character References (NCRs, e.g. `&#x...;`), preventing encoding errors in legacy Blogger XML engines.

---

## 3. Blogger-Specific Layout Nodes

The library provides dedicated component classes representing Blogger XML layout structures.

| Component Name | XML Equivalent | Key Properties |
| :--- | :--- | :--- |
| `BSection` | `<b:section>` | `id` (required), `maxwidgets`, `showaddelement` (`yes`/`no`), `growth`, `preferred` |
| `BWidget` | `<b:widget>` | `id` (required), `type` (required), `title`, `locked`, `pageType`, `mobile`, `version`, `visible` |
| `BIncludable` | `<b:includable>` | `id` (required), `var` |
| `BInclude` | `<b:include>` | `name` (required), `data`, `cond` |
| `BIf`, `BElseIf`, `BElse` | `<b:if>`, `<b:elseif>`, `<b:else>` | `cond` (required for If/ElseIf) |
| `BLoop` | `<b:loop>` | `values` (required), `varName` (required), `index` |
| `BData` | `<data:.../>` | `value` (required) |
| `BEval` | `<b:eval>` | `expr` (required) |
| `BWith` | `<b:with>` | `varName` (required), `value` (required) |

### Blogger Layout in TSX
```tsx
/** @jsxImportSource @antinna/blogger-theme */
import { BSection, BWidget, BIncludable, BIf, BData, Expr } from '@antinna/blogger-theme';

const themeLayout = (
  <BSection id="main-content" maxwidgets={2} showaddelement={true}>
    <BWidget id="Blog1" type="Blog">
      <BIncludable id="main">
        <BIf cond="data:view.isPost">
          <article class="post-item">
            <h1 expr:title="data:post.title">
              <BData value="post.title" />
            </h1>
            <div class="post-content">
              <BData value="post.body" />
            </div>
          </article>
        </BIf>
      </BIncludable>
    </BWidget>
  </BSection>
);
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
