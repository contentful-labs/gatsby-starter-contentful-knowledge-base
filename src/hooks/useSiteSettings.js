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
          description: siteDescriptionSeo
          logo {
            title
            fixed(width: 160) {
              src
              srcSet
              width
              height
            }
          }
          googleAnalyticsId
        }
      }
    }
  `);

  return data.settings.nodes?.[0] ?? {};
}
