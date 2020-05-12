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
  return (
    <Layout>
      <Container>
        <Hgroup>
          <Title>Welcome to the Burger King Help Center</Title>
          <Subtitle>How can we help?</Subtitle>
        </Hgroup>

        {props.data?.categories?.edges && (
          <WhiteContainer>
            {props.data.categories.edges.map(({ node }) => (
              <CategoryCard
                title={node.name}
                url={`/${node.slug}/`}
                description="Everything you need to know to get started with Contentful"
              />
            ))}
          </WhiteContainer>
        )}
      </Container>
    </Layout>
  );
}

export const query = graphql`
  {
    categories: allContentfulHelpCenterCategory {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;
