import React from 'react';
import { Link } from 'gatsby';

export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      {props.data?.map(({ node }) => (
        <div>
          <div>
            <p key={node.slug}>
              <Link to={`/${node.slug}/`}>{node.name}</Link>
            </p>
          </div>
        </div>
      ))}
    </aside>
  );
}
