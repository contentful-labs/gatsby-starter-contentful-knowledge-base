import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from './layout';
import Sidebar from '../components/sidebar';
import WhiteContainer from '../components/white-container';
import ArticleLink from '../components/article-link';
import Breadcrumb from '../components/breadcrumb';

const withArticles = (category) =>
  Array.isArray(category.articles) && category.articles.length > 0;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 245px 1fr;
  column-gap: 32px;
  align-items: start;
  grid-template-areas "empty title-group" "sidebar articles";

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const ArticleContainer = styled.div`
  padding: 12px 32px;
`;

const CategoryTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 12px;

  color: #2a3039;
  font-size: 28px;
  line-height: 1.5;
  font-weight: 700;
`;

const CategoryDescription = styled.h2`
  color: #536171;
  font-size: 21px;
  line-height: 1.5;
  font-weight: 400;
`;

const TitleGroup = styled.div``;

const Cell = styled.div`
  grid-area: ${(props) => props.area};
  margin-bottom: 32px;
`;

export default function Section(props) {
  const { categories, category } = props.data;
  const categoriesForSidebar = categories.nodes.filter(withArticles);

  return (
    <Layout>
      <Breadcrumb
        paths={[{ url: '/', name: 'All categories' }, { name: category.name }]}
      />

      <GridContainer>
        <Cell area="empty"></Cell>

        <Cell area="title-group">
          <TitleGroup>
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategoryDescription>
              {category.description.description}
            </CategoryDescription>
          </TitleGroup>
        </Cell>

        <Cell area="sidebar">
          <Sidebar data={categoriesForSidebar} />
        </Cell>

        <Cell area="articles">
          <WhiteContainer>
            <ArticleContainer>
              {category.articles.map((article) => (
                <ArticleLink
                  url={`/${category.slug}/${article.slug}/`}
                  label={article.title}
                />
              ))}
            </ArticleContainer>
          </WhiteContainer>
        </Cell>
      </GridContainer>
    </Layout>
  );
}

export const query = graphql`
  query PageData($id: String) {
    categories: allContentfulCategory {
      nodes {
        name
        slug
        articles: article {
          id
        }
      }
    }

    category: contentfulCategory(id: { eq: $id }) {
      name
      description {
        description
      }
      slug
      articles: article {
        title
        slug
      }
    }
  }
`;
