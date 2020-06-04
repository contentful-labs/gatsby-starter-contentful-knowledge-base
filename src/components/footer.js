import React from 'react';
import is from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Wrap from './wrap';
import Logo from './logo';

const FooterContainer = styled.footer`
  margin-top: 32px;
  margin-bottom: 30px;

  text-align: center;
`;

const LogoContainer = styled.div`
  text-align: center;
`;

const LinksContainer = styled.div`
  margin: 40px 0 20px;
  padding-top: 30px;

  border-top: 1px solid #d3dce0;
`;

const LinksNav = styled.nav`
  margin-bottom: 20px;
  text-align: center;

  & > a {
    margin: 0 15px;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > a {
      margin: 10px 0;
    }
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  color: #536171;
  font-size: 14px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  margin-top: 20px;

  font-size: 14px;
  color: #536171;
`;

export default function Footer(props) {
  return (
    <Wrap>
      <FooterContainer>
        <LogoContainer>
          <Link to="/">
            <Logo />
          </Link>
        </LogoContainer>

        <LinksContainer>
          <LinksNav>
            {props.links?.map((link, key) => (
              <Anchor
                href={link.url}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </Anchor>
            ))}
          </LinksNav>

          <Copyright>
            Powered by{' '}
            <Anchor
              href="https://www.contentful.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contentful
            </Anchor>
          </Copyright>
        </LinksContainer>
      </FooterContainer>
    </Wrap>
  );
}

Footer.propTypes = {
  links: is.arrayOf(
    is.shape({
      url: is.string.isRequired,
      text: is.string.isRequired,
    })
  ).isRequired,
};
