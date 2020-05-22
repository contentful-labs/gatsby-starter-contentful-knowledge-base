const path = require('path');
const sectionTemplate = path.resolve('src/templates/section.js');
const articleTemplate = path.resolve('src/templates/article.js');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      categories: allContentfulKbAppCategory {
        nodes {
          id
          slug
          name
          articles: kbapparticle {
            id
          }
        }
      }

      articles: allContentfulKbAppArticle {
        nodes {
          id
          slug
          title
          category: kbAppCategory {
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
  const withArticles = (category) =>
    Array.isArray(category.articles) && category.articles.length > 0;
  const categories = result.data.categories.nodes.filter(withArticles);

  categories.forEach((category) => {
    createPage({
      path: `/${category.slug}/`,
      component: sectionTemplate,
      context: {
        id: category.id,
        name: category.name,
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
        name: article.title,
      },
    });
  });
};
