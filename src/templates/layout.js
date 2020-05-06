import * as React from 'react';
import { Heading } from '@contentful/forma-36-react-components';
import './layout.css';

function Layout(props) {
  return (
    <section className="container">
      <header>
        <Heading>Help Center</Heading>
      </header>

      <main>{props.children}</main>
    </section>
  );
}

export default Layout;
