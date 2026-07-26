/** @jsx h */
/** @jsxFrag Fragment */
import { BloggerTheme, BSection, BWidget, BIf, BData, BSkin, Title, h, Fragment } from '../src/index.js';

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

// We export the theme as a default export for the Blogger CLI to load!
export default new BloggerTheme({
  attributes: {
    'b:responsive': 'true',
    'b:defaultwidgetversion': '2',
  },
  head: [
    <Title>Blogger Theme CLI Test</Title>,
    <BSkin css="body { background: #eee; }" />
  ],
  body: [
    <BlogLayout />
  ]
});
