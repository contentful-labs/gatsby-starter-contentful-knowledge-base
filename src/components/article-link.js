import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

const Text = styled.p`
  margin: 0;
  padding: 20px 0;

  font-size: 16px;

  border-bottom: 1px solid #d3dce0;

  &:last-child {
    border-bottom: 0;
  }
`;

const Link = styled(GatsbyLink)`
  color: #3C80CF;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default function ArticleLink(props) {
  return (
    <Text>
      <Link to={props.url}>{props.label}</Link>
    </Text>
  );
}
