import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../templates/layout';
import CategoryCard from '../components/category-card';
import WhiteContainer from '../components/white-container';

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

export default function Home(props) {
  const settings = props.data.settings.nodes[0];

  return (
    <Layout>
      <Container>
        <Hgroup>
          <Title>{settings.heading}</Title>
          <Subtitle>{settings.subheading}</Subtitle>
        </Hgroup>

        {props.data?.categories?.nodes && (
          <WhiteContainer>
            {props.data.categories.nodes.map((category) => (
              <CategoryCard
                title={category.name}
                url={`/${category.slug}/`}
                description={category.description.description}
              />
            ))}
          </WhiteContainer>
        )}
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query {
    settings: allContentfulSiteSettings {
      nodes {
        heading
        subheading
      }
    }

    categories: allContentfulCategory {
      nodes {
        name
        description {
          description
        }
        slug
      }
    }
  }
`;
