import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './layout';
import {
  Paragraph,
  Heading,
  Subheading,
} from '@contentful/forma-36-react-components';
import Sidebar from '../components/sidebar';

export default function Section(props) {
  console.log(props);

  return (
    <Layout>
      <div className="content">
        <Sidebar data={props.data.categories.edges} />

        <section>
          <Heading className="f36-margin-bottom--l">
            {props.data.category.name}
          </Heading>

          {props.data.subCategories.edges.map(({ node }) => (
            <div key={node.slug} className="f36-margin-bottom--2xl">
              <Subheading className="f36-margin-bottom--xs">
                {node.name}
              </Subheading>

              {node.articles?.map((article) => (
                <Paragraph key={article.slug}>
                  <Link
                    to={`/${props.data.category.slug}/${node.slug}/${article.slug}/`}
                  >
                    {article.title}
                  </Link>
                </Paragraph>
              ))}
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PageData($slug: String) {
    categories: allContentfulHelpCenterCategory {
      edges {
        node {
          name
          slug
        }
      }
    }

    subCategories: allContentfulHelpCenterSubCategory(
      filter: { category: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          name
          slug
          articles: helpcenter___article {
            title
            slug
          }
        }
      }
    }

    category: contentfulHelpCenterCategory(slug: { eq: $slug }) {
      name
      slug
    }
  }
`;
