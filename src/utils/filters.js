export const withArticles = (category) =>
  Array.isArray(category.articles) && category.articles.length > 0;
