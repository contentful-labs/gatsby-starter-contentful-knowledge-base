import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const Container = styled.div`
  padding: 32px;

  background-color: #fff;
  border-bottom: 1px solid #d3dce0;

  &:last-child {
    border-bottom: 0;
  }

  @media screen and (max-width: 375px) {
    padding: 20px;
  }
`;

const Title = styled.h3`
  margin: 0;

  color: #3072be;
  font-size: 21px;
  line-height: 1.5;
  font-weight: 700;

  & > a {
    text-decoration: none;
    color: #3072be;
  }

  & > a:hover,
  & > a:focus {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  margin: 0;

  color: #536171;
  font-size: 14px;
  line-height: 1.5;
`;

export default function CategoryCard(props) {
  return (
    <Container>
      <Title>
        <Link to={props.url}>{props.title}</Link>
      </Title>
      {props.description && <Text>{props.description}</Text>}
    </Container>
  );
}
