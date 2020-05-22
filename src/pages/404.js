import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';
import Layout from '../templates/layout';
import SEO from '../components/seo';

const Title = styled.h1`
  margin-bottom: 12px;

  color: #2a3039;
  font-weight: 700;
  font-size: 28px;
`;

const SubTitle = styled.h3`
  margin-bottom: 32px;

  color: #536171;
  font-weight: 400;
  font-size: 21px;
`;

const Link = styled(GatsbyLink)`
  color: #3072be;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default function Article() {
  return (
    <Layout withSearch={true}>
      <SEO
        title="404 page not found"
        description="The page you are looking for can’t be found."
      />

      <Title>The page you are looking for can’t be found.</Title>
      <SubTitle>Error code: 404</SubTitle>
      <Link to="/">Return to home page</Link>
    </Layout>
  );
}
