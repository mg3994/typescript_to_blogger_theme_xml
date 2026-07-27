import * as fs from 'fs';
import * as path from 'path';
import { BloggerTheme, BSection, BWidget, BClientScript, BSkin, Title, Div } from 'blogger-theme';

function buildTheme() {
  const theme = new BloggerTheme({
    attributes: {
      'b:responsive': 'true',
      'b:defaultwidgetversion': '2',
      'b:layoutsversion': '3',
    },
    head: [
      new Title(null, 'React Blogger Theme Example'),
      new BSkin('body { background-color: #f3f4f6; margin: 0; }')
    ],
    body: [
      new Div({ class: 'main-wrapper' },
        new BSection({
          id: 'header-area',
          className: 'header-section',
          maxwidgets: 1,
          showaddelement: true,
        },
          new BWidget({
            id: 'Header1',
            type: 'Header',
            title: 'My React Blog Header',
            locked: true,
          })
        ),

        // 1. This is where our React application will mount!
        new Div({ id: 'react-root' }),

        // 2. Embedded on-demand script compilation of React App using BClientScript!
        // Under the hood, this compiles React, React-DOM, and our App source files,
        // bundling them into a single, minified, self-invoking IIFE block.
        new BClientScript({ scriptPath: './src/index.tsx', contentInCDATA: true })
      )
    ]
  });

  const xml = theme.generate();

  const outputPath = path.resolve('blogger-theme.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');

  console.log(`\n🎉 Success! Blogger XML theme generated at: ${outputPath}`);
}

buildTheme();
