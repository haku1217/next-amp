const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*.tsx',
    'src/posts/*.md',
    '!src/pages/**/[slug].tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api'
  ])
  console.log({ pages }, 'pages path')
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src/pages', '')
                  .replace('src/posts/', '/blog/')
                  .replace('.tsx', '')
                  .replace('.md', '')
                const route = path === '/index' ? '' : path
                console.log(path, 'path')
                return `
                        <sitemap>
                            <loc>${`https://haku-dev.tk${route}`}</loc>
                            <changefreq>daily</changefreq>
                            <priority>1.0</priority>
                        </sitemap>
                    `
              })
              .join('')}
        </sitemapindex>
    `

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()

// const sitemap = `
// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
//     ${pages
//       .map((page) => {
//         const path = page
//           .replace('src/pages', '')
//           .replace('src/posts/', '/blog/')
//           .replace('.tsx', '')
//           .replace('.md', '')
//         const route = path === '/index' ? '' : path
//         console.log(path, 'path')
//         return `
//                 <url>
//                     <loc>${`https://haku-dev.tk${route}`}</loc>
//                     <changefreq>daily</changefreq>
//                     <priority>1.0</priority>
//                 </url>
//             `
//       })
//       .join('')}
// </urlset>
// `
