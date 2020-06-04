import React, { useState } from 'react';
import is from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Wrap from './wrap';
import { HamburgerIcon, CloseIcon } from './icons';
import Logo from './logo';

const HeaderWrap = styled(Wrap)`
  margin-bottom: 12px;

  border-bottom: 1px solid #d3dce0;
`;

const HeaderContainerDesktop = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0 26px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HeaderContainerMobile = styled(HeaderContainerDesktop)`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
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

const LinksNav = styled.nav`
  & > a {
    margin: 0 15px;
  }

  & > a:last-child {
    margin-right: 0;
  }
`;

const MobileContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50px;
  right: 0;
  z-index: 999999;

  width: calc(100% - 50px);
  height: 100%;

  background-color: #fff;
`;

const MobileOverlay = styled.div`
  position: fixed;
  z-index: 999998;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.39);
`;

const MobileMenu = styled.ul`
  padding: 0 16px;

  list-style-type: none;
`;

const MobileMenuItem = styled.li`
  padding: 10px;
`;

const MobileMenuLogoContainer = styled.div`
  padding: 32px 16px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #d3dce0;
`;

const MobileMenuAnchor = styled(Anchor)`
  color: ##526171;
`;

export default function Header(props) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function openMenu() {
    setIsMenuOpened(true);
  }

  function closeMenu() {
    setIsMenuOpened(false);
  }

  return (
    <HeaderWrap>
      <HeaderContainerDesktop>
        <Link to="/">
          <Logo />
        </Link>
        <LinksNav>
          {props.links.map((link, index) => (
            <Anchor
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </Anchor>
          ))}
        </LinksNav>
      </HeaderContainerDesktop>

      <HeaderContainerMobile>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <HamburgerIcon onClick={openMenu} />
      </HeaderContainerMobile>

      {isMenuOpened && <MobileOverlay />}

      {isMenuOpened && (
        <MobileContainer>
          <MobileMenuLogoContainer>
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>
            <CloseIcon onClick={closeMenu} />
          </MobileMenuLogoContainer>

          <MobileMenu>
            {props.links.map((link, index) => (
              <MobileMenuItem key={index}>
                <MobileMenuAnchor
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </MobileMenuAnchor>
              </MobileMenuItem>
            ))}
          </MobileMenu>
        </MobileContainer>
      )}
    </HeaderWrap>
  );
}

Header.propTypes = {
  links: is.arrayOf(
    is.shape({
      url: is.string.isRequired,
      text: is.string.isRequired,
    })
  ).isRequired,
};
