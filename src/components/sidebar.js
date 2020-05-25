import React, { useState } from 'react';
import is from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import styled from '@emotion/styled';

const Text = styled.p`
  margin-bottom: 20px;

  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled(GatsbyLink)`
  text-decoration: none;
  color: #536171;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const DesktopNav = styled.nav`
  display: none;

  @media screen and (min-width: 769px) {
    display: block;
  }

  @media print {
    display: block;
  }
`;

const MobileNav = styled.nav`
  display: none;

  background-color: #efefef;
  border-radius: 3px;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOpener = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  padding: 16px;
  margin-bottom: 0;

  border: 0;
  background: none;
  -webkit-appearance: none;

  &:after {
    content: '';
    height: 7px;
    width: 7px;
    margin-left: 8px;
    transform: rotate(${(props) => (props.isOpened ? '45deg' : '-45deg')});
    border-bottom: 2px solid currentcolor;
    border-right: 2px solid currentcolor;
    transition: all 0.25s ease 0s;
  }
`;

const MobileMenuLinksContainer = styled.div`
  padding: 16px;
`;

export default function Sidebar(props) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened((currValue) => !currValue);
  }

  return (
    <aside>
      <DesktopNav>
        {props.data?.map((item) => (
          <Text key={item.slug}>
            <Link
              to={`/${item.slug}/`}
              activeStyle={{ color: '#000', textDecoration: 'underline' }}
            >
              {item.name}
            </Link>
          </Text>
        ))}
      </DesktopNav>

      <MobileNav>
        <MobileMenuOpener
          isOpened={isMobileMenuOpened}
          onClick={toggleMobileMenu}
        >
          Topic
        </MobileMenuOpener>

        {isMobileMenuOpened && (
          <MobileMenuLinksContainer>
            {props.data?.map((item) => (
              <Text key={item.slug}>
                <Link
                  to={`/${item.slug}/`}
                  activeStyle={{ color: '#000', textDecoration: 'underline' }}
                >
                  {item.name}
                </Link>
              </Text>
            ))}
          </MobileMenuLinksContainer>
        )}
      </MobileNav>
    </aside>
  );
}

Sidebar.propTypes = {
  data: is.arrayOf(
    is.shape({
      slug: is.string.isRequired,
      name: is.string.isRequired,
    })
  ).isRequired,
};
