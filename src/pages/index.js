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
      <Subheading className="f36-margin-bottom--l">Categories</Subheading>

      <div className="grid">
        {props.data?.categories?.edges.map(({ node }) => (
          <Card
            padding="large"
            key={node.slug}
            className="f36-margin-bottom--l"
          >
            <Paragraph>
              <Link to={`/${node.slug}/`}>{node.name}</Link>
            </Paragraph>
          </Card>
        ))}
      </div>
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
