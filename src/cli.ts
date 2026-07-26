#!/usr/bin/env node

import { buildSync } from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Blogger Theme CLI Compiler
 */
function showHelp() {
  console.log(`
🚀 Blogger Theme Compiler CLI

Usage:
  npx blogger-theme <entrypoint.tsx> [options]

Options:
  -o, --out <file>   Specify the output XML file path (defaults to stdout)
  -w, --watch        Watch entrypoint and imported files for changes and recompile
  -h, --help         Show this help message
  `);
}

async function compile(entryPath: string, outputPath?: string) {
  const absoluteEntry = path.resolve(entryPath);
  if (!fs.existsSync(absoluteEntry)) {
    console.error(`❌ Error: Entrypoint file not found at "${absoluteEntry}"`);
    process.exit(1);
  }

  // Create a temporary directory for the compiled JS build
  const tempDir = path.join(path.dirname(absoluteEntry), '.blogger_theme_temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempOut = path.join(tempDir, `compiled_theme_${Date.now()}.mjs`);

  try {
    // Bundle the entrypoint using esbuild to ESM
    const buildResult = buildSync({
      entryPoints: [absoluteEntry],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node18',
      outfile: tempOut,
      external: ['esbuild', 'vitest', 'blogger-theme'],
      logLevel: 'silent',
    });

    if (buildResult.errors && buildResult.errors.length > 0) {
      console.error('❌ Esbuild compilation errors:');
      console.error(buildResult.errors);
      return;
    }

    // Dynamic import of the compiled module
    const fileUrl = `file://${tempOut.replace(/\\/g, '/')}`;
    const module = await import(fileUrl);

    // Look for exported theme
    const theme = module.default || module.theme;
    if (!theme) {
      console.error('❌ Error: The entrypoint file must default export a BloggerTheme instance or export a "theme" variable.');
      console.error('Example:\n  export default new BloggerTheme({ ... });\n  // OR\n  export const theme = new BloggerTheme({ ... });');
      return;
    }

    let xml: string;
    if (typeof theme.generate === 'function') {
      xml = theme.generate();
    } else if (typeof theme.render === 'function') {
      xml = '<?xml version="1.0" encoding="UTF-8" ?>\n' + theme.render();
    } else {
      console.error('❌ Error: Exported object must be a Component or a BloggerTheme instance with generate/render method.');
      return;
    }

    if (outputPath) {
      fs.writeFileSync(path.resolve(outputPath), xml, 'utf8');
      console.log(`\n✨ Successfully generated Blogger Theme XML at: ${path.resolve(outputPath)}`);
    } else {
      console.log(xml);
    }
  } catch (err: any) {
    console.error('❌ Compilation failed:');
    console.error(err.stack || err.message || err);
  } finally {
    // Clean up temporary files
    try {
      if (fs.existsSync(tempOut)) {
        fs.unlinkSync(tempOut);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    } catch (e) {
      // Ignore cleanup failures
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help') || args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const entryPath = args[0];
  if (entryPath.startsWith('-')) {
    console.error('❌ Error: First argument must be the path to the entrypoint file.');
    showHelp();
    process.exit(1);
  }

  let outputPath: string | undefined;
  const outIdx = args.findIndex(arg => arg === '-o' || arg === '--out');
  if (outIdx !== -1 && outIdx + 1 < args.length) {
    outputPath = args[outIdx + 1];
  }

  const isWatch = args.includes('-w') || args.includes('--watch');

  if (isWatch) {
    console.log(`👀 Watch mode enabled. Watching for changes...`);
    await compile(entryPath, outputPath);

    const absoluteEntryDir = path.dirname(path.resolve(entryPath));
    let timeout: NodeJS.Timeout | null = null;

    fs.watch(absoluteEntryDir, { recursive: true }, async (eventType, filename) => {
      if (filename && (filename.endsWith('.ts') || filename.endsWith('.tsx') || filename.endsWith('.js') || filename.endsWith('.jsx'))) {
        if (filename.includes('.blogger_theme_temp') || filename.includes('node_modules') || (outputPath && filename === path.basename(outputPath))) {
          return;
        }

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(async () => {
          console.log(`🔄 Change detected in "${filename}". Recompiling...`);
          await compile(entryPath, outputPath);
        }, 100);
      }
    });
  } else {
    await compile(entryPath, outputPath);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
