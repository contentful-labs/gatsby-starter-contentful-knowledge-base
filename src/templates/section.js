import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from './layout';
import Sidebar from '../components/sidebar';

export default function Section(props) {
  return (
    <Layout>
      <div className="content">
        <Sidebar data={props.data?.categories?.edges} />

        <section>
          <h1>{props.data?.category?.name}</h1>

          {props.data?.subCategories?.edges.map(({ node }) => (
            <div key={node.slug}>
              <h2>{node.name}</h2>

              {node.articles?.map((article) => (
                <p key={article.slug}>
                  <Link
                    to={`/${props.data?.category?.slug}/${node.slug}/${article.slug}/`}
                  >
                    {article.title}
                  </Link>
                </p>
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
