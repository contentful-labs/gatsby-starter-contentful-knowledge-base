import * as React from 'react';
import { Heading } from '@contentful/forma-36-react-components';
import './layout.css';
import { Link } from 'gatsby';

function Layout(props) {
  return (
    <>
      <header className="header">
        <div className="wrap">
          <Heading className="logo">
            <Link to="/">Help Center</Link>
          </Heading>
        </div>
      </header>

      <main class="wrap">{props.children}</main>
    </>
  );
}

export default Layout;
