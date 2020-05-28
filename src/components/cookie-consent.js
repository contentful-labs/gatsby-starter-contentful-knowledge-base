import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WhiteContainer from './white-container';

const Banner = styled(WhiteContainer)`
  position: fixed;
  bottom: 20px;
  left: 15%;
  right: 15%;
  z-index: 9999;

  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  padding: 30px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: block;
    left: 10px;
    right: 10px;

    padding: 20px 25px;
  }

  @media print {
    display: none;
  }
`;

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button`
  display: inline-block;
  padding: 7px 15px;

  color: #3072be;

  border: 0;
  background: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 20px;
    padding: 7px 0;

    text-align: left;
  }
`;

export default function CookieConsent() {
  const [hasAgreed, setHasAgreed] = useState(true);

  useEffect(() => {
    setHasAgreed(localStorage.getItem('cookie-consent') === 'yes');
  }, []);

  function handleOnClick(event) {
    event.preventDefault();

    setHasAgreed(true);
    localStorage.setItem('cookie-consent', 'yes');
  }

  if (hasAgreed) return null;

  return (
    <Banner>
      <Text>
        This website may store data such as cookies to enable analytics
        functionalities.
      </Text>
      <Button onClick={handleOnClick}>Accept and close</Button>
    </Banner>
  );
}
