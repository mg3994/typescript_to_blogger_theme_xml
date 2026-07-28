import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import React from 'react';
import * as fs from 'fs';
import * as path from 'path';

// Import our modern React-first library
import {
  renderToBloggerTheme,
  escapeXml,
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
  BTemplateSkin,
  BloggerThemeValidator,
} from './index.js';

describe('Modern Core Render Engine', () => {
  it('escapes XML reserved characters', () => {
    expect(escapeXml('Hello & Welcome <world>')).toBe('Hello &amp; Welcome &lt;world&gt;');
  });

  it('filters XML 1.0 restricted control characters', () => {
    expect(escapeXml('Hello\x00World\x07!')).toBe('Hello World !');
  });

  it('renders standard React tree to Blogger XML', () => {
    const element = (
      <div id="main" className="container">
        <span>Hello World!</span>
      </div>
    );
    const xml = renderToBloggerTheme(element);
    expect(xml).toContain('<div id="main" class="container"><span>Hello World!</span></div>');
  });
});

describe('Blogger Specific React Components', () => {
  it('renders BSection and maps className to class', () => {
    const sec = (
      <BSection id="header-section" className="header" showaddelement={true} maxwidgets={1} />
    );
    const xml = renderToBloggerTheme(sec);
    expect(xml).toContain('<b:section id="header-section" class="header" maxwidgets="1" showaddelement="yes"/>');
  });

  it('renders BWidget and handles standard attributes', () => {
    const widget = (
      <BWidget id="Header1" type="Header" title="Blog Header" locked={true} />
    );
    const xml = renderToBloggerTheme(widget);
    expect(xml).toContain('<b:widget id="Header1" type="Header" title="Blog Header" locked="true"/>');
  });

  it('renders BIf and BElse conditionals', () => {
    const cond = (
      <BIf cond="data:view.isPost">
        <Div>This is a post</Div>
      </BIf>
    );
    const xml = renderToBloggerTheme(cond);
    expect(xml).toContain('<b:if cond="data:view.isPost"><div>This is a post</div></b:if>');
  });

  it('renders BData properly as self-closing XML tag', () => {
    const dataNode = <BData value="post.title" />;
    const xml = renderToBloggerTheme(dataNode);
    expect(xml).toContain('<data:post.title/>');
  });

  it('renders BSkin with variables and CDATA CSS content', () => {
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
    const skin = (
      <BSkin
        css="body { background: $(body.bg); }"
        variables={[skinGroup]}
      />
    );

    const xml = renderToBloggerTheme(skin);
    expect(xml).toContain('<b:skin>');
    expect(xml).toContain('<![CDATA[');
    expect(xml).toContain('Variable definitions:');
    expect(xml).toContain('body { background: $(body.bg); }');
  });
});

describe('Expr & Data Helpers', () => {
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

describe('On-Demand Client Script Compilation', () => {
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

  it('compiles TypeScript source code to self-invoking IIFE inside script at render time', () => {
    const script = (
      <BClientScript scriptPath={tempFile} mode="cdata" />
    );

    const xml = renderToBloggerTheme(script);
    expect(xml).toContain('<script type="text/javascript">');
    expect(xml).toContain('//<![CDATA[');
    expect(xml).toContain('Hello Blogger!');
    expect(xml).toContain('//]]>');
    expect(xml).toContain('</script>');
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
        <title key="title">My Generated Theme</title>,
        <BSkin key="skin" css="body { margin: 0; }" />
      ],
      body: [
        <div key="wrapper" className="wrapper">
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

  it('detects and errors on invalid className inside b: native namespace elements', () => {
    const invalidTree = (
      <BSection id="main" className="invalid-prop">
        <BWidget id="Blog1" type="Blog" />
      </BSection>
    );
    const validator = new BloggerThemeValidator();
    const errors = validator.validate(invalidTree);
    expect(errors.some(e => e.type === 'error' && e.message.includes("className"))).toBe(true);
  });

  it('automatically maps className to class for standard HTML element rendering', () => {
    const htmlTree = (
      <div className="react-style-wrapper">
        <p className="react-para">Text</p>
      </div>
    );
    const xml = renderToBloggerTheme(htmlTree);
    expect(xml).toContain('<div class="react-style-wrapper">');
    expect(xml).toContain('<p class="react-para">');
  });

  it('supports inline style CSS object compilation correctly', () => {
    const styleTree = (
      <div style={{ color: 'red', marginTop: '15px', backgroundColor: '#fff', fontSize: 14 }}>
        Styled Text
      </div>
    );
    const xml = renderToBloggerTheme(styleTree);
    expect(xml).toContain('<div style="color:red;margin-top:15px;background-color:#fff;font-size:14px">Styled Text</div>');
  });

  it('supports automatic React attribute camelCase mapping', () => {
    const formTree = (
      <form noValidate tabIndex={1}>
        <input type="text" readOnly maxLength={20} autoFocus />
      </form>
    );
    const xml = renderToBloggerTheme(formTree);
    expect(xml).toContain('<form novalidate="" tabindex="1">');
    expect(xml).toContain('<input type="text" readonly="" maxlength="20" autofocus=""/>');
  });

  it('minifies HTML/XML output correctly while preserving CDATA blocks intact', () => {
    const theme = new BloggerTheme({
      attributes: {},
      head: [
        <title key="title">Spacing Test</title>,
        <BSkin key="skin" css="body { margin:   0; }" />
      ],
      body: [
        <div key="body">
          <span>Inside</span>
        </div>
      ]
    });

    const minifiedXml = theme.generate({ minify: true });
    expect(minifiedXml).toContain('<head><title>Spacing Test</title><b:skin><![CDATA[');
    expect(minifiedXml).toContain('</b:skin></head><body><div><span>Inside</span></div></body></html>');
    expect(minifiedXml).toContain('body { margin:   0; }');
  });

  it('supports compiling and bundling CSS from file paths in BSkin and BTemplateSkin', () => {
    const tempMainCss = path.resolve('temp-main.css');
    const tempImportCss = path.resolve('temp-import.css');

    fs.writeFileSync(tempImportCss, `
      .imported {
        color: blue;
      }
    `);

    fs.writeFileSync(tempMainCss, `
      @import "./temp-import.css";
      body {
        margin: 0;
        padding: 0;
      }
    `);

    try {
      const skin = <BSkin css={tempMainCss} />;
      const renderedSkin = renderToBloggerTheme(skin);
      expect(renderedSkin).toContain('.imported{color:#00f}');
      expect(renderedSkin).toContain('body{margin:0;padding:0}');

      const templateSkin = <BTemplateSkin css={tempMainCss} />;
      const renderedTemplateSkin = renderToBloggerTheme(templateSkin);
      expect(renderedTemplateSkin).toContain('.imported{color:#00f}');
      expect(renderedTemplateSkin).toContain('body{margin:0;padding:0}');
    } finally {
      if (fs.existsSync(tempMainCss)) fs.unlinkSync(tempMainCss);
      if (fs.existsSync(tempImportCss)) fs.unlinkSync(tempImportCss);
    }
  });

  it('supports Expr logical expression helpers correctly', () => {
    const condAnd = Expr.and('data:view.isPost', 'data:post.allowComments');
    expect(condAnd).toBe('(data:view.isPost) and (data:post.allowComments)');

    const condOr = Expr.or('data:view.isHomepage', 'data:view.isArchive');
    expect(condOr).toBe('(data:view.isHomepage) or (data:view.isArchive)');

    const condNot = Expr.not('data:view.isError');
    expect(condNot).toBe('not (data:view.isError)');

    const condEq = Expr.eq('data:blog.pageType', '"item"');
    expect(condEq).toBe('(data:blog.pageType) == ("item")');
  });

  it('renders standard table components correctly', () => {
    const tableElement = (
      <table>
        <thead>
          <tr>
            <th>Heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </table>
    );
    const xml = renderToBloggerTheme(tableElement);
    expect(xml).toContain('<table><thead><tr><th>Heading</th></tr></thead><tbody><tr><td>Content</td></tr></tbody></table>');
  });
});
