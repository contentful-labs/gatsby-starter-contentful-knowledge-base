import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteSettings() {
  const data = useStaticQuery(graphql`
    query Settings {
      settings: allContentfulSiteSettings {
        nodes {
          headerLinks {
            text
            url
          }
          heading
          subheading
          siteName
          logo {
            title
            fixed(width: 160) {
              src
            }
          }
        }
      }
    }
  `);

  return data.settings.nodes[0];
}
