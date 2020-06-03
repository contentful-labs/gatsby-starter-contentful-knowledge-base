require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID_REQUIRED,
        accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN_REQUIRED,
        useNameForId: false,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'articles',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: `
            {
              articles: allContentfulKbAppArticle {
                nodes {
                  contentful_id
                  title
                  slug
                  category: kbAppCategory {
                    slug
                  }
                }
              }
            }
          `,

        ref: 'id',
        index: ['name'],
        store: ['name', 'path'],
        normalizer: ({ data }) =>
          data.articles.nodes.map((node) => ({
            id: node.contentful_id,
            name: node.title,
            path: `/${node.category.slug}/${node.slug}/`,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => {
          return process.env.URL;
        },
        serialize: ({ allSitePage }) =>
          allSitePage.nodes.map((node) => ({
            url: `${process.env.URL}${node.path}`,
            changefreq: 'daily',
            priority: 0.7,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: [
          'SPACE_ID_REQUIRED',
          'CONTENTFUL_DELIVERY_API_TOKEN_REQUIRED',
          'CONTENTFUL_PREVIEW_API_TOKEN_REQUIRED',
          'URL',
        ],
      },
    },
    'gatsby-plugin-netlify',
  ],
};
