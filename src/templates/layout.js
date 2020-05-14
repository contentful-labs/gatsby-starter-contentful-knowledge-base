import * as React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Wrap from '../components/wrap';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Layout(props) {
  const settings = useSiteSettings();

  return (
    <>
      <Header
        links={settings.headerLinks}
        logoUrl={settings.logo.fixed.src}
        logoDescription={settings.logo.title}
      />

      <Wrap>{props.children}</Wrap>

      <Footer
        links={[]}
        logoUrl={settings.logo.fixed.src}
        logoDescription={settings.logo.title}
      />
    </>
  );
}
