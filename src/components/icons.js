import React from 'react';
import styled from '@emotion/styled';

const width = '20px';

const Button = styled.button`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${width};
  height: 14px;
  padding: 0;

  border: 0;
  background: none;
`;

const Stripe = styled.span`
  display: block;
  width: ${width};
  height: 2px;

  border-radius: 3px;
  background-color: #536171;
`;

const Cross = styled(Stripe)`
  position: absolute;
  bottom: 30%;
  left: 0;

  background-color: #536171;
`;

const CrossOne = styled(Cross)`
  transform: rotate(135deg);
`;

const CrossTwo = styled(Cross)`
  transform: rotate(-135deg);
`;

export function HamburgerIcon(props) {
  return (
    <Button {...props}>
      <Stripe />
      <Stripe />
      <Stripe />
    </Button>
  );
}

export function CloseIcon(props) {
  return (
    <Button {...props}>
      <CrossOne />
      <CrossTwo />
    </Button>
  );
}
