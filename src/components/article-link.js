import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

const Text = styled.p`
  position: relative;

  margin: 0;
  padding: 25px 36px 25px 80px;

  font-size: 16px;
  line-height: 1.5;

  background-image: url('/icons/icon-file.svg');
  background-repeat: no-repeat;
  background-position: 36px center;

  &:hover {
    background-color: #f8f9fa;
  }

  &:not(:last-child):after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 80px;
    right: 36px;

    height: 1px;

    background-color: #d3dce0;
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
