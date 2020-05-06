import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Subheading,
  Card,
  Paragraph,
} from '@contentful/forma-36-react-components';
import Layout from '../templates/layout';

export default function Home(props) {
  return (
    <Layout>
      <Subheading>Categories</Subheading>

      {props.data.categories.edges.map(({ node }) => (
        <Card padding="large" href={`/${node.slug}/`}>
          <Paragraph>{node.name}</Paragraph>
        </Card>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query ContentfulCategories {
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
