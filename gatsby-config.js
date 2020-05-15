require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_API_TOKEN,
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
              articles: allContentfulArticle {
                nodes {
                  contentful_id
                  title
                  slug
                  category {
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
  ],
};
