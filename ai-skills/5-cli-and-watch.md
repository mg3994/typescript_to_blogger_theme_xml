# AI Skill 5: CLI and Watch-Compiler

This guide describes how to use the built-in Command Line Interface (CLI) binary to compile, bundle, and watch Blogger TSX entrypoints in real time.

---

## 1. CLI Usage & Commands

The `@antinna/blogger-theme` package exposes a standard binary named `blogger-theme`. You can trigger it via `npx blogger-theme`.

### Basic Compilation
Compiles a TSX theme entrypoint and prints the generated XML layout to stdout:
```bash
npx blogger-theme src/theme.tsx
```

### Save Compilation to XML
Compiles the TSX file and saves the output directly to a designated Blogger theme XML file:
```bash
npx blogger-theme src/theme.tsx -o blogger-theme.xml
```

---

## 2. Real-Time Watcher Mode

When developing themes locally, you can enable watcher mode by appending `-w` or `--watch`.

```bash
npx blogger-theme src/theme.tsx -o blogger-theme.xml --watch
```

### How the Watcher Works
1. It listens to file change events across the entrypoint directory recursively.
2. It filters out compiler-generated files and temporary items to avoid infinite recompilation loops.
3. Whenever a `.ts`, `.tsx`, `.js`, or `.jsx` file is updated, it automatically:
   - Synchronously rebuilds the TSX dependencies using `esbuild`.
   - Re-evaluates the default export of the module (which must be a `BloggerTheme` instance or export a `theme` variable).
   - Runs structural validation and prints pretty diagnostics.
   - Regenerates the Blogger XML template file instantly, enabling real-time developer workflows.
