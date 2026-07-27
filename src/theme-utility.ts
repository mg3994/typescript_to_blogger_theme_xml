import { Component, Renderer } from './core.js';
import { Html, Head, Body } from './html-components.js';
import { BloggerThemeValidator } from './devtool.js';

export interface BloggerThemeProps {
  head: Iterable<Component>;
  body: Iterable<Component>;
  attributes?: Record<string, string>;
}

/**
 * Builds a complete Blogger theme document from head and body components.
 * Use [generate] to render the theme as a full XML string with the required
 * Blogger template XML declaration.
 */
export class BloggerTheme extends Component {
  public head: Iterable<Component>;
  public body: Iterable<Component>;
  public attributes?: Record<string, string>;

  constructor(props: BloggerThemeProps) {
    super();
    this.head = props.head;
    this.body = props.body;
    this.attributes = props.attributes;
  }

  override build(): Component[] {
    return [
      new Html(
        this.attributes ? { attributes: this.attributes } : null,
        new Head(null, ...this.head),
        new Body(null, ...this.body)
      )
    ];
  }

  /**
   * Renders this theme to a full Blogger-compatible XML document.
   */
  generate(): string {
    // Run structure validation to provide helpful devtool diagnostics and redline logs.
    const validator = new BloggerThemeValidator();
    validator.checkAndReport(this, false); // log redlines on the console

    const renderer = new Renderer();
    return '<?xml version="1.0" encoding="UTF-8" ?>\n' + renderer.render(this);
  }
}
