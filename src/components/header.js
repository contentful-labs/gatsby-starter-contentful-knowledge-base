import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Wrap from './wrap';
import { HamburgerIcon, CloseIcon } from './icons';

const HeaderContainerDesktop = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0 26px;
  margin-bottom: 32px;

  border-bottom: 1px solid #d3dce0;

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
  left: 0;
  z-index: 999999;

  width: 100%;
  height: 100%;

  background-color: #3072be;
`;

const MobileMenu = styled.ul`
  padding: 0 16px;

  list-style-type: none;
`;

const MobileMenuItem = styled.li`
  padding: 10px;

  border-bottom: 1px solid rgba(24, 56, 95, 0.3);
`;

const MobileMenuLogoContainer = styled.div`
  padding: 32px 16px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileMenuAnchor = styled(Anchor)`
  color: #fff;
`;

export default function Header(props) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function openMenu() {
    setIsMenuOpened(true);
  }

  function closeMenu() {
    setIsMenuOpened(false);
  }

  function renderLogo() {
    return <img src={props.logoUrl} alt={props.logoDescription} />;
  }

  return (
    <Wrap>
      <HeaderContainerDesktop>
        <Link to="/">{renderLogo()}</Link>
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
          <Link to="/">{renderLogo()}</Link>
        </div>

        <HamburgerIcon onClick={openMenu} />
      </HeaderContainerMobile>

      {isMenuOpened && (
        <MobileContainer>
          <MobileMenuLogoContainer>
            <Link to="/" onClick={closeMenu}>
              {renderLogo()}
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
    </Wrap>
  );
}
