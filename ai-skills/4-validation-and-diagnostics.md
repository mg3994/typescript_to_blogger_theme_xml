# AI Skill 4: Blogger Structural Validation & Diagnostics

This guide describes the built-in validation rules, diagnostics, and semantic warnings provided by the structural devtools of `@antinna/blogger-theme`.

---

## 1. Structural Validation Rules

Blogger layouts are strict. Placing elements incorrectly can result in silent rendering failures, broken layouts, or XML compilation rejections on Blogger's servers.

The `BloggerThemeValidator` traverses the entire generated JSX/Component tree to analyze and enforce the following rules:

### Error Rules
- **Unique IDs:** All `<b:section>` and `<b:widget>` elements must have globally unique `id` values. Duplicate IDs trigger validation errors.
- **Section Nesting:** You cannot nest a `<b:section>` inside another `<b:section>`.
- **Invalid Section Placement:** A `<b:section>` must only reside directly inside the `<body>` or structural `<div>` elements. Placing a section inside inline containers (like `<p>`, `<span>`, `<a>`, `<button>`) triggers an error.
- **Widget Placement:** All `<b:widget>` elements **must sit directly inside** a `<b:section>`. They cannot sit inside normal HTML elements or fragments.
- **Widget Children:** Children of a `<b:widget>` must only be `<b:includable>` or `<b:widget-settings>` elements. Any HTML tag placed directly inside a `<b:widget>` triggers an error.
- **Includable Placement:** `<b:includable>` tags must sit directly inside a `<b:widget>` or `<b:defaultmarkup>`.
- **Blogger Attribute Restrictions:** The React-style `className` attribute is strictly forbidden on Blogger native elements (e.g. `<b:section className="...">`). Developers must write `class` instead.

### XHTML Warnings
- **Anchor Nesting:** Warns if an `<a>` anchor tag is nested inside another `<a>` tag.
- **Form Nesting:** Warns if a `<form>` is nested inside another `<form>`.
- **List Items:** Warns if an `<li>` element is placed outside of `<ul>`, `<ol>`, or `<menu>` containers.
- **Table Structure:** Warns if `<tr>`, `<td>`, or `<th>` elements are placed outside of proper table parent containers.

---

## 2. Using the Validator in Your Code

To execute validation programmatically on your component tree, use the `BloggerThemeValidator` class:

```typescript
import { BloggerThemeValidator } from '@antinna/blogger-theme';

const validator = new BloggerThemeValidator();

// Validate a component layout
const issues = validator.validate(myLayoutComponent);

for (const issue of issues) {
  if (issue.type === 'error') {
    console.error(`[${issue.type.toUpperCase()}] ${issue.message} at Path: ${issue.path.join(' -> ')}`);
  } else {
    console.warn(`[${issue.type.toUpperCase()}] ${issue.message} at Path: ${issue.path.join(' -> ')}`);
  }
}
```

---

## 3. Pretty-Report Console Output

You can use the helper method `checkAndReport` to print colored console reports and optionally crash the build process if critical validation errors are found:

```typescript
import { BloggerThemeValidator } from '@antinna/blogger-theme';

const validator = new BloggerThemeValidator();

// Prints beautiful formatted output to the console.
// If throwOnError is true, it throws a Compilation Error if any 'error' is detected.
validator.checkAndReport(myThemeLayout, /* throwOnError */ true);
```
