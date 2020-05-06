const path = require('path');
const sectionTemplate = path.resolve('src/templates/section.js');
const articleTemplate = path.resolve('src/templates/article.js');

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  const result = await graphql(`
    query {
      categories: allContentfulHelpCenterCategory {
        edges {
          node {
            slug
          }
        }
      }
      articles: allContentfulHelpCenterArticle {
        edges {
          node {
            slug
            subCategory {
              slug
              category {
                slug
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    // do something
  }

  // Create category pages
  result.data.categories.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: sectionTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  // Create article pages
  result.data.articles.edges.forEach(({ node }) => {
    createPage({
      path: `${node.subCategory.category.slug}/${node.subCategory.slug}/${node.slug}`,
      component: articleTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};
