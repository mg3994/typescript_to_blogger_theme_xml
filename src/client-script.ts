import { buildSync } from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { Component, DomComponent, RawText, Text } from './core.js';

export interface BClientScriptProps {
  scriptPath: string;
  contentInCDATA?: boolean;
}

/**
 * Loads a JS/TS script from disk and compiles/bundles it to an IIFE at render time.
 * The output script is fully compiled and bundled using esbuild.
 */
export class BClientScript extends Component {
  public scriptPath: string;
  public contentInCDATA?: boolean;

  constructor(props: BClientScriptProps | string) {
    super();
    if (typeof props === 'string') {
      this.scriptPath = props;
    } else {
      this.scriptPath = props.scriptPath;
      this.contentInCDATA = props.contentInCDATA;
    }
  }

  override build(): Component[] {
    return [new CompiledScript(this.scriptPath, this.contentInCDATA)];
  }
}

/**
 * Internal helper component that compiles a TypeScript or JavaScript file to an IIFE.
 */
class CompiledScript extends DomComponent {
  constructor(public scriptPath: string, public contentInCDATA?: boolean) {
    super('script', { type: 'text/javascript' });
  }

  override build(): Component[] {
    const jsContent = this._compileToJs();
    return [
      this.contentInCDATA === true
        ? new RawText(`//<![CDATA[\n${jsContent}\n//]]>`)
        : new Text(jsContent, false) // raw text is safe for JS injection
    ];
  }

  private _compileToJs(): string {
    const absolutePath = path.resolve(this.scriptPath);
    if (!fs.existsSync(absolutePath)) {
      return `// Error: Script not found at ${absolutePath}`;
    }

    try {
      const result = buildSync({
        entryPoints: [absolutePath],
        bundle: true,
        minify: true,
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
}
