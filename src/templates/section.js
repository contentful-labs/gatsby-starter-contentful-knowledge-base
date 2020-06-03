import React from 'react';
import is from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from './layout';
import Sidebar from '../components/sidebar';
import WhiteContainer from '../components/white-container';
import ArticleLink from '../components/article-link';
import Breadcrumb from '../components/breadcrumb';
import { withArticles } from '../utils/filters';
import SEO from '../components/seo';

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

const ArticleContainer = styled.div``;

const CategoryTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 12px;

  color: #2a3039;
  font-size: 28px;
  line-height: 1.5;
  font-weight: 700;
`;

const CategoryDescription = styled.h2`
  margin: 0;

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
    <Layout withSearch={true}>
      <SEO
        title={category.name}
        description={category.description}
        lang={category.locale}
      />

      <Breadcrumb
        paths={[{ url: '/', name: 'All categories' }, { name: category.name }]}
      />

      <GridContainer>
        <Cell area="empty"></Cell>

        <Cell area="title-group">
          <TitleGroup>
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategoryDescription>{category.description}</CategoryDescription>
          </TitleGroup>
        </Cell>

        <Cell area="sidebar">
          <Sidebar data={categoriesForSidebar} />
        </Cell>

        <Cell area="articles">
          <WhiteContainer>
            <ArticleContainer>
              {category.articles.map((article, index) => (
                <ArticleLink
                  key={index}
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

Section.propTypes = {
  data: is.shape({
    categories: is.shape({
      nodes: is.arrayOf(
        is.shape({
          name: is.string.isRequired,
          slug: is.string.isRequired,
          articles: is.arrayOf(
            is.shape({
              id: is.string.isRequired,
            })
          ).isRequired,
        })
      ),
    }),
    category: is.shape({
      name: is.string.isRequired,
      description: is.string.isRequired,
      slug: is.string.isRequired,
      articles: is.arrayOf(
        is.shape({
          title: is.string.isRequired,
          slug: is.string.isRequired,
        })
      ).isRequired,
      locale: is.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query PageData($id: String) {
    categories: allContentfulKbAppCategory {
      nodes {
        name
        slug
        articles: kbapparticle {
          id
        }
      }
    }

    category: contentfulKbAppCategory(id: { eq: $id }) {
      name
      description: previewDescription
      slug
      articles: kbapparticle {
        title
        slug
      }
      locale: node_locale
    }
  }
`;
