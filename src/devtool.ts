import { Component, DomComponent } from './core.js';

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  path: string[];
}

/**
 * BloggerThemeValidator analyzes a Component tree to ensure it conforms to Blogger's strict layout rules.
 * It detects nesting violations, incorrect tag placements, missing required attributes, and duplicate IDs.
 */
export class BloggerThemeValidator {
  private errors: ValidationError[] = [];
  private seenIds = new Set<string>();

  private invalidSectionContainers = new Set([
    'p', 'span', 'a', 'b:widget', 'b:includable', 'b:include', 'b:if', 'b:loop', 'b:attr',
    'section', 'article', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'input', 'ul', 'ol', 'li'
  ]);

  /**
   * Validates a component tree and returns any encountered errors or warnings.
   */
  public validate(root: Component): ValidationError[] {
    this.errors = [];
    this.seenIds.clear();
    this._traverse(root, []);
    return this.errors;
  }

  /**
   * Validates and prints any structural issues in a beautiful, styled format.
   * If errors are found and throwOnError is true, it throws an error.
   */
  public checkAndReport(root: Component, throwOnError: boolean = false): void {
    const issues = this.validate(root);
    if (issues.length === 0) {
      return;
    }

    const red = '\x1b[31m';
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    const bold = '\x1b[1m';

    console.log(`\n${bold}${yellow}⚠️  [blogger-theme] Blogger Template Structure Validation Issues Found:${reset}`);

    let hasErrors = false;
    for (const issue of issues) {
      if (issue.type === 'error') {
        hasErrors = true;
        console.error(
          `  ${red}${bold}[ERROR]${reset} ${issue.message}\n` +
          `          Path: ${issue.path.join(' -> ')}`
        );
      } else {
        console.warn(
          `  ${yellow}${bold}[WARNING]${reset} ${issue.message}\n` +
          `          Path: ${issue.path.join(' -> ')}`
        );
      }
    }
    console.log('');

    if (hasErrors && throwOnError) {
      throw new Error('Blogger Theme Validation Failed! Please resolve the structural errors listed above.');
    }
  }

  private _traverse(component: any, path: string[]): void {
    if (!component) return;

    if (component instanceof DomComponent || (component && typeof component.tag === 'string')) {
      const tag = component.tag;
      const attributes = component.attributes || {};
      const parentTag = path[path.length - 1];

      // 1. Check Unique ID rules
      if (tag === 'b:widget' || tag === 'b:section') {
        const id = attributes['id'];
        if (!id) {
          this.errors.push({
            type: 'error',
            message: `A <${tag}> element must have a unique 'id' attribute.`,
            path: [...path, tag]
          });
        } else {
          if (this.seenIds.has(id)) {
            this.errors.push({
              type: 'error',
              message: `Duplicate ID found: '${id}'. Both <b:section> and <b:widget> elements must have globally unique IDs across the entire theme.`,
              path: [...path, `${tag}#${id}`]
            });
          } else {
            this.seenIds.add(id);
          }
        }
      }

      // 2. Validate <b:section> nesting
      if (tag === 'b:section') {
        if (path.includes('b:section')) {
          this.errors.push({
            type: 'error',
            message: 'Invalid nesting: You cannot nest a <b:section> inside another <b:section>.',
            path: [...path, tag]
          });
        }

        // Validate <b:section> container limits
        for (const ancestor of path) {
          if (this.invalidSectionContainers.has(ancestor)) {
            this.errors.push({
              type: 'error',
              message: `Invalid section placement: A <b:section> must be placed inside <body> or structural <div>s. You cannot put <b:section> inside <${ancestor}>.`,
              path: [...path, tag]
            });
            break;
          }
        }
      }

      // 3. Validate <b:widget> rules
      if (tag === 'b:widget') {
        if (parentTag !== 'b:section') {
          this.errors.push({
            type: 'error',
            message: `<b:widget> elements must sit directly inside a <b:section>. They cannot contain other widgets, and cannot be nested inside <${parentTag || 'Fragment'}>.`,
            path: [...path, tag]
          });
        }
      }

      // 4. Validate children inside <b:widget>
      if (parentTag === 'b:widget') {
        if (tag !== 'b:includable' && tag !== 'b:widget-settings') {
          this.errors.push({
            type: 'error',
            message: `Invalid child inside <b:widget>: Children of a <b:widget> must be <b:includable> elements (e.g. <b:includable id='main'>) or <b:widget-settings>. You cannot place <${tag}> directly inside <b:widget>.`,
            path: [...path, tag]
          });
        }
      }

      // 5. Validate <b:includable> placement
      if (tag === 'b:includable') {
        if (parentTag !== 'b:widget' && parentTag !== 'b:defaultmarkup') {
          this.errors.push({
            type: 'error',
            message: `<b:includable> elements must sit directly inside a <b:widget> or a <b:defaultmarkup>. They cannot be placed inside <${parentTag || 'Fragment'}>.`,
            path: [...path, tag]
          });
        }
      }

      // Move deep
      const nextPath = [...path, tag];
      const built = component.build ? component.build() : null;
      if (built) {
        this._traverseBuilt(built, nextPath);
      }
    } else if (component && typeof component.build === 'function') {
      const built = component.build();
      if (built) {
        this._traverseBuilt(built, path);
      }
    }
  }

  private _traverseBuilt(built: any, path: string[]): void {
    if (typeof built.build === 'function' || typeof built.tag === 'string') {
      this._traverse(built, path);
    } else if (built[Symbol.iterator]) {
      for (const child of built) {
        this._traverse(child, path);
      }
    }
  }
}
