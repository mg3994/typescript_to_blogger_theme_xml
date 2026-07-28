import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Import our library (using JSX automatic runtime or explicit imports)
import {
  Component,
  Text,
  RawText,
  DomComponent,
  Fragment,
  BloggerTheme,
  BSection,
  BWidget,
  BIf,
  BElse,
  BData,
  BSkin,
  BVariable,
  BGroup,
  BClientScript,
  Div,
  Span,
  Expr,
  Data,
  Feeds,
  h,
  BloggerThemeValidator,
} from './index.js';

describe('Core Component Model & Renderer', () => {
  it('renders simple text with escaping', () => {
    const text = new Text('Hello & Welcome <world>');
    expect(text.render()).toBe('Hello &amp; Welcome &lt;world&gt;');
  });

  it('renders raw text without escaping', () => {
    const raw = new RawText('Hello & Welcome <world>');
    expect(raw.render()).toBe('Hello & Welcome <world>');
  });

  it('filters XML 1.0 restricted control characters', () => {
    const ctrlText = new Text('Hello\x00World\x07!');
    expect(ctrlText.render()).toBe('Hello World !');
  });

  it('renders DomComponent with attributes and children (Option C)', () => {
    const div = new DomComponent('div', {
      attributes: { class: 'container', id: 'main' },
      children: [new Text('Inside')]
    });
    expect(div.render()).toBe('<div class="container" id="main">Inside</div>');
  });

  it('renders nested components using classic constructor', () => {
    const div = new DomComponent('div', { class: 'outer' },
      new DomComponent('span', { class: 'inner' }, 'Content')
    );
    expect(div.render()).toBe('<div class="outer"><span class="inner">Content</span></div>');
  });

  it('renders Fragments without adding extra wrappers', () => {
    const frag = new Fragment(null, new Span(null, 'One'), new Span(null, 'Two'));
    expect(frag.render()).toBe('<span>One</span><span>Two</span>');
  });
});

describe('Blogger Specific Components', () => {
  it('renders BSection with default yes/no for showaddelement', () => {
    const sec = new BSection({
      id: 'header-section',
      className: 'header',
      showaddelement: true,
      maxwidgets: 1,
    });
    expect(sec.render()).toBe('<b:section id="header-section" class="header" maxwidgets="1" showaddelement="yes"/>');
  });

  it('renders BWidget and handles standard attributes', () => {
    const widget = new BWidget({
      id: 'Header1',
      type: 'Header',
      title: 'Blog Header',
      locked: true,
    });
    expect(widget.render()).toBe('<b:widget id="Header1" type="Header" title="Blog Header" locked="true"/>');
  });

  it('renders BIf and BElse conditionals', () => {
    const cond = new BIf({ cond: 'data:view.isPost' }, new Div(null, 'This is a post'));
    expect(cond.render()).toBe('<b:if cond="data:view.isPost"><div>This is a post</div></b:if>');
  });

  it('renders BData properly', () => {
    const dataNode = new BData('post.title');
    expect(dataNode.render()).toBe('<data:post.title/>');
  });

  it('renders BSkin with variables and CSS content', () => {
    const skinVar = new BVariable({
      name: 'body.bg',
      description: 'Body Background',
      type: 'color',
      defaultValue: '#ffffff',
    });
    const skinGroup = new BGroup({
      description: 'Main Group',
      variables: [skinVar],
    });
    const skin = new BSkin({
      css: 'body { background: $(body.bg); }',
      variables: [skinGroup],
    });

    const expectedSkinXml =
      '<!-- prettier-ignore -->' +
      '<b:skin><![CDATA[\n' +
      '/*\n' +
      ' * Variable definitions:\n' +
      ' <Group description="Main Group">\n' +
      ' <Variable name="body.bg" description="Body Background" type="color" default="#ffffff"/>\n' +
      ' </Group>\n' +
      ' */\n' +
      'body { background: $(body.bg); }\n' +
      ']]></b:skin>';

    expect(skin.render()).toBe(expectedSkinXml);
  });
});

describe('HTML Components & Helpers', () => {
  it('Html component merges namespaces and default properties', () => {
    const html = new Div({ 'b:responsive': 'false' });
    expect(html.render()).toContain('b:responsive="false"');
  });

  it('Expr helpers build valid Blogger expressions', () => {
    expect(Expr.attr('class', 'data:post.class')).toEqual({ 'expr:class': 'data:post.class' });
    expect(Expr.get('post.url')).toBe('data:post.url');
    expect(Expr.resizeImage('http://example.com/img.jpg', 400, '1:1', 'true')).toBe('resizeImage(http://example.com/img.jpg, 400, "1:1", "true")');
  });

  it('Feeds helpers generate correct feed URLs', () => {
    expect(Feeds.posts({ maxResults: 5, label: 'featured' })).toBe('data:blog.homepageUrlfeeds/posts/default/-/featured?max-results=5');
    expect(Feeds.summary({ maxResults: 3 })).toBe('data:blog.homepageUrlfeeds/summary?max-results=3');
  });
});

describe('JSX/TSX Integration', () => {
  it('supports classic JSX rendering (h)', () => {
    const element = h('div', { class: 'test-jsx' },
      h('h1', null, 'Title'),
      h('p', null, 'Paragraph')
    );
    expect(element.render()).toBe('<div class="test-jsx"><h1>Title</h1><p>Paragraph</p></div>');
  });

  it('supports lowercase standard HTML and custom classes in JSX', () => {
    // We can simulate automatic JSX runtime compilation
    const element = (
      <div id="wrapper-div" class="container">
        <BSection id="main-area" showaddelement={true}>
          <BWidget id="Blog1" type="Blog" />
        </BSection>
      </div>
    );

    const xml = element.render();
    expect(xml).toContain('<div id="wrapper-div" class="container">');
    expect(xml).toContain('<b:section id="main-area" showaddelement="yes">');
    expect(xml).toContain('<b:widget id="Blog1" type="Blog"/>');
    expect(xml).toContain('</b:section>');
    expect(xml).toContain('</div>');
  });
});

describe('Client Script Bundling (BClientScript)', () => {
  const tempFile = path.resolve('temp-script.ts');

  beforeAll(() => {
    fs.writeFileSync(tempFile, `
      const message: string = "Hello Blogger!";
      const greet = (name: string) => \`\${message} \${name}\`;
      console.log(greet("TS"));
    `);
  });

  afterAll(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  it('compiles TypeScript source code to self-invoking IIFE at render time', () => {
    const clientScript = new BClientScript({
      scriptPath: tempFile,
      mode: 'cdata',
    });

    const rendered = clientScript.render();
    expect(rendered).toContain('<script type="text/javascript">');
    expect(rendered).toContain('//<![CDATA[');
    expect(rendered).toContain('Hello Blogger!');
    expect(rendered).toContain('//]]>');
    expect(rendered).toContain('</script>');
  });

  it('gracefully handles missing files', () => {
    const clientScript = new BClientScript('non-existent.ts');
    expect(clientScript.render()).toContain('// Error: Script not found at');
  });
});

describe('BloggerTheme Generation', () => {
  it('generates complete valid Blogger theme XML document', () => {
    const theme = new BloggerTheme({
      attributes: {
        'b:responsive': 'true',
        'b:defaultwidgetversion': '2',
      },
      head: [
        <title>My Generated Theme</title>,
        <BSkin css="body { margin: 0; }" />
      ],
      body: [
        <div class="wrapper">
          <BSection id="main" showaddelement={true} />
        </div>
      ]
    });

    const xml = theme.generate();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" ?>');
    expect(xml).toContain('<html');
    expect(xml).toContain('b:responsive="true"');
    expect(xml).toContain('b:defaultwidgetversion="2"');
    expect(xml).toContain('<head><title>My Generated Theme</title>');
    expect(xml).toContain('<body><div class="wrapper"><b:section id="main" showaddelement="yes"/></div></body>');
    expect(xml).toContain('</html>');
  });
});

describe('Blogger Structure Validator (Devtool)', () => {
  it('detects nested b:section elements', () => {
    const invalidTree = (
      <BSection id="parent">
        <BSection id="child" />
      </BSection>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.message.includes('nest a <b:section> inside another <b:section>'))).toBe(true);
  });

  it('detects b:widget nested incorrectly (outside b:section)', () => {
    const invalidTree = (
      <div>
        <BWidget id="Blog1" type="Blog" />
      </div>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.message.includes('<b:widget> elements must sit directly inside a <b:section>'))).toBe(true);
  });

  it('detects b:section placed inside invalid containers', () => {
    const invalidTree = (
      <div>
        <p>
          <BSection id="main" />
        </p>
      </div>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.message.includes('Invalid section placement'))).toBe(true);
  });

  it('detects invalid child direct tags inside b:widget', () => {
    const invalidTree = (
      <BSection id="main">
        <BWidget id="Blog1" type="Blog">
          <div>Invalid directly inside widget</div>
        </BWidget>
      </BSection>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.message.includes('Invalid child inside <b:widget>'))).toBe(true);
  });

  it('detects duplicate IDs for sections and widgets', () => {
    const invalidTree = (
      <BSection id="main">
        <BWidget id="widget1" type="Blog" />
        <BWidget id="widget1" type="Blog" />
      </BSection>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.message.includes("Duplicate ID found: 'widget1'"))).toBe(true);
  });

  it('detects nested <a> anchor tag warnings', () => {
    const invalidTree = (
      <a>
        <span>
          <a>Nested link</a>
        </span>
      </a>
    );
    const validator = new BloggerThemeValidator();
    const warnings = validator.validate(invalidTree);
    expect(warnings.some(w => w.type === 'warning' && w.message.includes('cannot nest an <a> tag inside another <a> tag'))).toBe(true);
  });

  it('detects <li> element placed outside a list container warning', () => {
    const invalidTree = (
      <div>
        <li>ListItem outside ul/ol</li>
      </div>
    );
    const validator = new BloggerThemeValidator();
    const warnings = validator.validate(invalidTree);
    expect(warnings.some(w => w.type === 'warning' && w.message.includes('An <li> element must sit directly inside'))).toBe(true);
  });

  it('detects and errors on invalid className inside b: native namespace elements', () => {
    const invalidTree = (
      <b:section id="main" className="invalid-prop">
        <BWidget id="Blog1" type="Blog" />
      </b:section>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.type === 'error' && e.message.includes("'className' is not allowed on Blogger native elements"))).toBe(true);
  });

  it('automatically maps className to class for standard HTML element rendering', () => {
    const htmlTree = (
      <div className="react-style-wrapper">
        <p className="react-para">Text</p>
      </div>
    );
    const xml = htmlTree.render();
    expect(xml).toContain('<div class="react-style-wrapper">');
    expect(xml).toContain('<p class="react-para">');
  });

  it('supports inline style CSS object compilation correctly', () => {
    const styleTree = (
      <div style={{ color: 'red', marginTop: '15px', backgroundColor: '#fff', fontSize: 14 }}>
        Styled Text
      </div>
    );
    const xml = styleTree.render();
    expect(xml).toContain('<div style="color: red; margin-top: 15px; background-color: #fff; font-size: 14px;">Styled Text</div>');
  });

  it('supports automatic React attribute camelCase mapping', () => {
    const formTree = (
      <form noValidate tabIndex={1}>
        <input type="text" readOnly maxLength={20} autoFocus />
      </form>
    );
    const xml = formTree.render();
    expect(xml).toContain('<form novalidate="true" tabindex="1">');
    expect(xml).toContain('<input type="text" readonly="true" maxlength="20" autofocus="true"/>');
  });
});
