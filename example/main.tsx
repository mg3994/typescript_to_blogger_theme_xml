/** @jsx h */
/** @jsxFrag Fragment */
import { BloggerTheme, BSection, BWidget, BIf, BData, BSkin, Title, h, Fragment } from '../src/index.js';

// 1. Define your layout component using TSX (Declarative JSX Style)
const BlogLayout = () => (
  <div class="wrapper-pane">
    <BSection id="header-area" className="header-section" maxwidgets={1} showaddelement={true}>
      <BWidget id="Header1" type="Header" title="Blog Header Title" locked={true} />
    </BSection>

    <BIf cond="data:view.isPost">
      <div class="post-item">
        <BData value="post.body" />
      </div>
    </BIf>
  </div>
);

// 2. Generate Blogger theme XML
function generateTheme() {
  const theme = new BloggerTheme({
    attributes: {
      'b:responsive': 'true',
      'b:defaultwidgetversion': '2',
      'b:layoutsversion': '3',
    },
    head: [
      <Title>Generated Blogger Theme</Title>,
      <BSkin css="body { font-family: Arial, sans-serif; }" />
    ],
    body: [
      <BlogLayout />
    ]
  });

  const xml = theme.generate();
  console.log('--- GENERATED BLOGGER TEMPLATE XML ---');
  console.log(xml);
}

generateTheme();
