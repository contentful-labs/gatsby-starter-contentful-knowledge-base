import { useStaticQuery, graphql } from 'gatsby';

export default function useSiteSettings() {
  const data = useStaticQuery(graphql`
    query Settings {
      settings: allContentfulKbAppSiteSettings {
        nodes {
          headerLinks {
            text
            url
          }
          heading
          subheading
          siteName
          description: siteDescription {
            siteDescription
          }
          logo {
            title
            fixed(width: 160) {
              src
            }
          }
          googleAnalyticsId
        }
      }
    }
  `);

  return data.settings.nodes?.[0] ?? {};
}
