import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import ArticleLink from '../components/article-link';

const Form = styled.form`
  position: relative;

  width: 100%;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;

  border: 1px solid #c3cfd5;

  background-image: url('/icons/icon-search.svg');
  background-repeat: no-repeat;
  background-position: 8px center; 
`;

const ResultsContainer = styled.nav`
  position: absolute;
  left: 0;
  top: calc(100% + 23px);

  width: 100%;
  max-height: 400px;
  overflow: scroll;

  background-color: #fff;
  border: 1px solid #d3dce0;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
`;

export default function SearchForm(props) {
  const [isResultsOpened, setIsResultsOpened] = useState(true);

  return (
    <Form method="post">
      <SearchField
        type="search"
        name="query"
        id="query"
        placeholder="Search for articles"
      />

      {isResultsOpened && (
        <ResultsContainer>
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
          <ArticleLink
            url="/"
            label="Tips for getting started with large transfers"
          />
        </ResultsContainer>
      )}
    </Form>
  );
}
