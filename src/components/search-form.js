import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import ArticleLink from '../components/article-link';
import WhiteContainer from './white-container';
import { useDebounce } from '../hooks/useDebounce';
import useOnClickOutside from '../hooks/useOnClickOutside';

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

  &::placeholder {
    font-size: 14px;
  }
`;

const ResultsContainer = styled(WhiteContainer)`
  position: absolute;
  left: 0;
  top: calc(100% + 23px);
  z-index: 9999;

  width: 100%;
  max-height: 400px;
  overflow: scroll;

  box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 768px) {
    top: calc(100% + 2px);
    left: -16px;

    width: calc(100% + 32px);
  }
`;

const Text = styled.p`
  margin: 0;
  padding: 24px 36px 24px 80px;

  line-height: 1.5;

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
  }
`;

export default function SearchForm() {
  const formRef = useRef();
  const [query, setQuery] = useState();
  const debouncedQuery = useDebounce(query, 500);
  const { localSearchArticles } = useStaticQuery(graphql`
    query {
      localSearchArticles {
        index
        store
      }
    }
  `);
  const searchResults = useFlexSearch(
    debouncedQuery,
    localSearchArticles.index,
    JSON.parse(localSearchArticles.store)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isResultsOpened, setIsResultsOpened] = useState(false);

  useOnClickOutside(formRef, () => {
    setIsResultsOpened(false);
    setIsLoading(false);
  });

  useEffect(() => {
    setIsResultsOpened(!!debouncedQuery);
    setIsLoading(false);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!query) {
      setIsResultsOpened(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [query]);

  function handleOnSubmit(event) {
    event.preventDefault();

    setQuery(event.target.elements.query.value);
  }

  function handleOnQueryChange(event) {
    setQuery(event.target.value);
  }

  return (
    <Form method="post" onSubmit={handleOnSubmit} ref={formRef}>
      <SearchField
        type="search"
        name="query"
        id="query"
        placeholder="Search for articles"
        onChange={handleOnQueryChange}
      />

      {(isResultsOpened || isLoading) && (
        <ResultsContainer>
          {isLoading && <Text>Loading...</Text>}

          {!isLoading &&
            searchResults?.map((result, index) => (
              <ArticleLink key={index} url={result.path} label={result.name} />
            ))}

          {!isLoading && !searchResults?.length && (
            <Text>
              No results for <i>&quot;{query}&quot;</i>
            </Text>
          )}
        </ResultsContainer>
      )}
    </Form>
  );
}
