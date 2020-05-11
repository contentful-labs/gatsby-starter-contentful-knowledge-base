import React, { useState, useEffect } from 'react';
import Article from '../templates/article';

const url = `https://preview.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;

export default function Preview(props) {
  const [data, setData] = useState();
  const params = new URLSearchParams(props.location.search);

  useEffect(() => {
    if (!params.get('entry')) return;

    getDraftEntry();
    getDraftCategories();
  }, []);

  async function getDraftEntry() {
    const res = await fetch(
      `${url}/entries/${params.get('entry')}?access_token=${previewToken}`,
    );

    if (!res.ok) return;

    const json = await res.json();

    setData((currData) => ({
      ...currData,
      article: {
        ...json.fields,
        content: {
          json: json.fields.content,
        },
      },
    }));
  }

  async function getDraftCategories() {
    const res = await fetch(
      `${url}/entries/?content_type=helpCenterCategory&access_token=${previewToken}`,
    );

    if (!res.ok) return;

    const json = await res.json();
    const categories = json.items
      .filter((category) => !!category.fields.slug && !!category.fields.name)
      .map((category) => ({
        node: { ...category.fields },
      }));

    setData((currData) => ({
      ...currData,
      categories: {
        edges: categories,
      },
    }));
  }

  if (!params.get('entry'))
    return (
      <p>
        <code>entry</code> query parameter is required.
      </p>
    );

  if (!data) return null;

  return <Article data={data} />;
}
