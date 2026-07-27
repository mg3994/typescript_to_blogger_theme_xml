/** @jsxImportSource @antinna/blogger-theme */
import * as fs from 'fs';
import * as path from 'path';
import {
  BloggerTheme,
  BSection,
  BWidget,
  BClientScript,
  BSkin,
  Title,
  BIf,
  BIncludable,
  BInclude,
  BParam,
  BData,
  Expr,
  Data
} from '@antinna/blogger-theme';

// Define a modular layout component using TSX (Declarative JSX style)
// Note: our generalized types support standard lowercase tags like div, span, etc.
// as well as custom Blogger elements (BIf, BIncludable) and expression prefixing!
const BlogHeader = () => (
  <header class="header-container" expr:style="'background-color: #fff; border-bottom: 1px solid #ddd;'">
    <BSection id="main-header" className="main-header-sec" maxwidgets={1} showaddelement={true}>
      <BWidget id="Header1" type="Header" title="My React Blog Header" locked={true} />
    </BSection>

    {/* Example of b:if, b:attr, and expression mapping inside TSX layouts */}
    <BIf cond="data:view.isHomepage">
      <div class="homepage-banner" cond="data:view.isHomepage">
        <h1 expr:title="data:blog.title">Welcome to {Expr.get('blog.title')}!</h1>
        <p>A cutting-edge blog layout engineered entirely in TypeScript.</p>
      </div>
    </BIf>
  </header>
);

const BlogLayout = () => (
  <div class="wrapper-pane">
    <BlogHeader />

    <main class="content-area">
      {/* Example of Blogger custom inclusion/parameters using TSX */}
      <BIncludable id="main" varName="post">
        <div class="post-item-view" expr:id="'post-' + data:post.id">
          <h2 expr:class="data:post.class">
            <a expr:href="data:post.url"><BData value="post.title" /></a>
          </h2>
          <div class="post-body">
            <BData value="post.body" />
          </div>
        </div>
      </BIncludable>

      <BInclude name="main">
        <BParam value="data:post" />
      </BInclude>

      {/* 1. This is where our React application will mount! */}
      <div id="react-root"></div>

      {/* 2. Embedded on-demand script compilation of React App using BClientScript! */}
      {/* Under the hood, this compiles React, React-DOM, and our App source files,
          bundling them into a single, minified, self-invoking IIFE block. */}
      <BClientScript scriptPath="./src/index.tsx" mode="cdata" />
    </main>
  </div>
);

function buildTheme() {
  const theme = new BloggerTheme({
    attributes: {
      'b:responsive': 'true',
      'b:defaultwidgetversion': '2',
      'b:layoutsversion': '3',
    },
    head: [
      <Title>React Blogger Theme Example</Title>,
      <BSkin css="body { background-color: #f3f4f6; margin: 0; font-family: sans-serif; }" />
    ],
    body: [
      <BlogLayout />
    ]
  });

  const xml = theme.generate();

  const outputPath = path.resolve('blogger-theme.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');

  console.log(`\n🎉 Success! Blogger XML theme generated at: ${outputPath}`);
}

buildTheme();
