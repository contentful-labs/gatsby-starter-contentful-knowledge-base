const path = require('path');
const sectionTemplate = path.resolve('src/templates/section.js');
const articleTemplate = path.resolve('src/templates/article.js');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      categories: allContentfulCategory {
        nodes {
          id
          slug
        }
      }

      articles: allContentfulArticle {
        nodes {
          id
          slug
          category {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    // do something
  }

  // Create category pages
  result.data.categories.nodes.forEach((category) => {
    createPage({
      path: category.slug,
      component: sectionTemplate,
      context: {
        id: category.id,
      },
    });
  });

  // Create article pages
  result.data.articles.nodes.forEach((article) => {
    createPage({
      path: `/${article.category.slug}/${article.slug}/`,
      component: articleTemplate,
      context: {
        id: article.id,
      },
    });
  });
};
