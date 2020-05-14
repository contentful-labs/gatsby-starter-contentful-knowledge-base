import React from 'react';
import is from 'prop-types';
import { Helmet } from 'react-helmet';
import useSiteSettings from '../hooks/useSiteSettings';

export default function SEO(props) {
  const settings = useSiteSettings();
  const { title, description, siteName, lang } = props;
  const name = siteName ?? settings.siteName;

  return (
    <Helmet
      title={title}
      htmlAttributes={{
        lang: lang?.toLowerCase() ?? 'en-us',
      }}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
      titleTemplate={`%s | ${name}`}
      defaultTitle={name}
    ></Helmet>
  );
}

SEO.propTypes = {
  title: is.string.isRequired,
  description: is.string,
  siteName: is.string,
  lang: is.string,
};
