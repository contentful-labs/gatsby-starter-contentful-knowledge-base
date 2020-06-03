import React from 'react';
import is from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../templates/layout';
import CategoryCard from '../components/category-card';
import WhiteContainer from '../components/white-container';
import { withArticles } from '../utils/filters';
import useSiteSettings from '../hooks/useSiteSettings';
import SEO from '../components/seo';
import SearchForm from '../components/search-form';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Hgroup = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin-bottom: 12px;

  font-size: 28px;
  line-height: 1.5;
  font-weight: 700;
  font-weight: 400;
`;

const Subtitle = styled.h2`
  color: #536171;
  font-size: 21px;
  line-height: 1.5;
  font-weight: 400;
`;

const SearchContainer = styled.div`
  width: 625px;
  margin: 0 auto;
  margin-bottom: 44px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 33px;
  }
`;

export default function Home(props) {
  const settings = useSiteSettings();
  const categories = props.data.categories.nodes.filter(withArticles);

  return (
    <Layout>
      <SEO title={settings.heading} description={settings.description} />

      <Container>
        <Hgroup>
          <Title>{settings.heading}</Title>
          <Subtitle>{settings.subheading}</Subtitle>
        </Hgroup>

        <SearchContainer>
          <SearchForm />
        </SearchContainer>

        <WhiteContainer>
          {categories.map((category, index) => (
            <CategoryCard
              title={category.name}
              url={`/${category.slug}/`}
              description={category.description}
              key={index}
            />
          ))}
        </WhiteContainer>
      </Container>
    </Layout>
  );
}

Home.propTypes = {
  data: is.shape({
    categories: is.shape({
      nodes: is.arrayOf(
        is.shape({
          name: is.string.isRequired,
          slug: is.string.isRequired,
          description: is.string.isRequired,
          articles: is.arrayOf(
            is.shape({
              id: is.string.isRequired,
            })
          ),
        })
      ),
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  query {
    categories: allContentfulKbAppCategory {
      nodes {
        name
        description: previewDescription
        slug
        articles: kbapparticle {
          id
        }
      }
    }
  }
`;
