import * as React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Wrap from '../components/wrap';

function Layout(props) {
  // TODO: to be removed
  const links = [
    { url: 'https://www.bk.com', label: 'Visit bk.com' },
    { url: 'https://www.bk.com', label: 'Privacy Policy' },
    { url: 'https://www.bk.com', label: 'Cookies Policy' },
  ];

  return (
    <>
      <Header links={links} />

      <Wrap>{props.children}</Wrap>

      <Footer links={links} />
    </>
  );
}

export default Layout;
