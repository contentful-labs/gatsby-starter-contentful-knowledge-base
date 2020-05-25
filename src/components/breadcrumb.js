import React from 'react';
import is from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const ListContainer = styled.ul`
  padding: 0;
  margin: 0 0 24px;

  list-style-type: none;
`;

const ListItem = styled.li`
  display: inline-block;
  margin: 4px 0;

  color: #8091a5;
  font-size: 14px;

  & > a {
    color: #536171;
    text-decoration: none;
  }

  & > a:hover,
  & > a:focus {
    text-decoration: underline;
  }

  &:not(:last-child):after {
    content: '>';
    margin: 0 4px;

    color: #8f9eaf;
  }
`;

export default function Breadcrumb(props) {
  if (!Array.isArray(props.paths) || props.paths?.length === 0) return null;

  return (
    <ListContainer>
      {props.paths.map((path, index) => (
        <ListItem key={index}>
          {path.url ? <Link to={path.url}>{path.name}</Link> : `${path.name}`}
        </ListItem>
      ))}
    </ListContainer>
  );
}

Breadcrumb.propTypes = {
  paths: is.arrayOf(
    is.shape({
      name: is.string.isRequired,
      url: is.string,
    })
  ),
};
