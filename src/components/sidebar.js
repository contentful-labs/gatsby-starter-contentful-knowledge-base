import React from 'react';
import { Card, Paragraph } from '@contentful/forma-36-react-components';
import { Link } from 'gatsby';

export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      {props.data.map(({ node }) => (
        <div className="f36-margin-bottom--s">
          <Card>
            <Paragraph key={node.slug}>
              <Link to={`/${node.slug}/`}>{node.name}</Link>
            </Paragraph>
          </Card>
        </div>
      ))}
    </aside>
  );
}
