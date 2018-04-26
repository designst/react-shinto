import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (
  css: Object,
  head: Object,
  assets: Object,
  htmlContent: string,
  initialState: Object,
  loadableStateTag: string,
): string => {
  const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        
        <noscript id="jss-insertion-point"></noscript>

        <!-- Insert bundled styles into <link> tag -->
        ${Object.keys(assets)
          .map(
            key =>
              assets[key].css
                ? `<link href="${
                    assets[key].css
                  }" media="screen, projection" rel="stylesheet" type="text/css">`
                : '',
          )
          .join('')}

      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="root">${htmlContent}</div>
        
        <style id="jss-server-side">${css}</style>

        <!-- Insert loadableState's script tag into page (loadable-components setup) -->
        ${loadableStateTag}

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__ = ${serialize(initialState)};
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${Object.keys(assets)
          .reverse() // Reverse scripts to get correct ordering
          .map(key => `<script src="${assets[key].js}"></script>`)
          .join('')}

        ${head.script.toString()}
      </body>
    </html>
  `;

  // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
  const minifyConfig = {
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    removeComments: true,
    collapseWhitespace: true,
    trimCustomFragments: true,
  };

  // Minify html in production
  return __DEV__ ? html : minify(html, minifyConfig);
};
