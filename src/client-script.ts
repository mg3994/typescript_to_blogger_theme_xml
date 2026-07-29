import React from 'react';
import { buildSync } from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

export interface BClientScriptProps {
  scriptPath: string;
  mode?: "raw" | "cdata" | "escaped";
  minify?: boolean;
}

function compileToJs(scriptPath: string, minify: boolean = true): string {
  const absolutePath = path.resolve(scriptPath);
  if (!fs.existsSync(absolutePath)) {
    return `// Error: Script not found at ${absolutePath}`;
  }

  try {
    const result = buildSync({
      entryPoints: [absolutePath],
      bundle: true,
      minify: minify,
      format: 'iife',
      target: 'esnext',
      write: false,
      logLevel: 'silent',
    });

    if (result.errors && result.errors.length > 0) {
      return `// Error compiling to JS:\n${result.errors.map(e => e.text).join('\n')}`;
    }

    const outputFiles = result.outputFiles;
    if (outputFiles && outputFiles.length > 0) {
      return outputFiles[0].text;
    }
    return '// Error: No output generated';
  } catch (err: any) {
    return `// Error compiling to JS:\n${err.message || err}`;
  }
}

/**
 * React-first component that loads a JS/TS script from disk and compiles/bundles it to an IIFE at render time.
 */
export function BClientScript({ scriptPath, mode, minify = true }: BClientScriptProps) {
  const jsContent = compileToJs(scriptPath, minify);
  const finalMode = mode || "raw";

  if (finalMode === 'cdata') {
    return React.createElement('script', {
      type: 'text/javascript',
      dangerouslySetInnerHTML: { __html: `//<![CDATA[\n${jsContent}\n//]]>` }
    });
  } else {
    return React.createElement('script', {
      type: 'text/javascript',
      dangerouslySetInnerHTML: { __html: jsContent }
    });
  }
}
