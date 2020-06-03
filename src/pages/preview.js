import React, { useState, useEffect } from 'react';
import is from 'prop-types';
import Article from '../templates/article';
import Layout from '../templates/layout';

const url = `https://preview.contentful.com/spaces/${process.env.SPACE_ID_REQUIRED}`;
const previewToken = process.env.CONTENTFUL_PREVIEW_API_TOKEN_REQUIRED;

export default function Preview(props) {
  const params = new URLSearchParams(props.location.search);
  const [data, setData] = useState();
  const [hasError, setHasError] = useState(!params.get('entry'));
  const [isLoading, setIsLoading] = useState(!!params.get('entry'));

  useEffect(() => {
    if (!params.get('entry')) return;

    fetchContent();
  }, []); // eslint-disable-line

  async function fetchContent() {
    try {
      setIsLoading(true);
      setHasError(false);

      const [draft, categories] = await Promise.all([
        getDraftEntry(),
        getDraftCategories(),
      ]);
      const category = await getDraftCategory(
        draft.fields.kbAppCategory.sys.id
      );

      setData((currData) => ({
        ...currData,
        article: {
          ...draft.fields,
          body: {
            json: draft.fields.body,
          },
          category: {
            ...category.fields,
          },
        },
        categories: {
          edges: categories,
        },
      }));
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function getDraftEntry() {
    const res = await fetch(
      `${url}/entries/${params.get('entry')}?access_token=${previewToken}`
    );

    if (!res.ok) return;

    const json = await res.json();

    return json;
  }

  async function getDraftCategory(categoryId) {
    const res = await fetch(
      `${url}/entries/${categoryId}?access_token=${previewToken}`
    );

    if (!res.ok) return;

    const json = await res.json();

    return json;
  }

  async function getDraftCategories() {
    const res = await fetch(
      `${url}/entries/?content_type=kbAppCategory&access_token=${previewToken}`
    );

    if (!res.ok) return;

    const json = await res.json();
    const categories = json.items
      .filter((category) => !!category.fields.slug && !!category.fields.name)
      .map((category) => ({
        node: { ...category.fields },
      }));

    return categories;
  }

  if (isLoading)
    return (
      <Layout>
        <h3>Loading preview...</h3>
      </Layout>
    );

  if (hasError)
    return (
      <Layout>
        <h3>
          We were unable to preview the article, please make sure the{' '}
          <code>entry</code> parameter on the URL is correct.
        </h3>
      </Layout>
    );

  return <Article data={data} />;
}

Preview.propTypes = {
  location: is.shape({
    search: is.string.isRequired,
  }).isRequired,
};
