import React from 'react';
import { Html, Head, Body } from './html-components.js';
import { BloggerThemeValidator } from './devtool.js';
import { renderToBloggerTheme } from './core.js';

export interface BloggerThemeProps {
  head: React.ReactNode;
  body: React.ReactNode;
  attributes?: Record<string, string>;
}

/**
 * Builds a complete Blogger theme XML document from standard React components.
 * Use [generate] to render the theme as a full Blogger-compatible XML string.
 */
export class BloggerTheme {
  public head: React.ReactNode;
  public body: React.ReactNode;
  public attributes?: Record<string, string>;

  constructor(props: BloggerThemeProps) {
    this.head = props.head;
    this.body = props.body;
    this.attributes = props.attributes;
  }

  /**
   * Renders this theme to a full Blogger-compatible XML document.
   */
  generate(options?: { minify?: boolean }): string {
    const rootElement = React.createElement(Html, { attributes: this.attributes },
      React.createElement(Head, null, this.head),
      React.createElement(Body, null, this.body)
    );

    // Run structural diagnostics/devtool validation on the compiled component/theme
    try {
      const validator = new BloggerThemeValidator();
      validator.checkAndReport(rootElement, false);
    } catch (e) {
      // ignore validation reporting failures
    }

    return renderToBloggerTheme(rootElement, options);
  }
}
