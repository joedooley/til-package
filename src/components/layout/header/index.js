import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SkipNavLink } from '@components/core/skip-nav';
import Flex from '@components/core/html/flex';

export const SiteHeader = styled.header(
  ({ theme }) => css`
    align-items: center;
    background: ${theme.colors.black.primary};
    display: flex;
    justify-content: space-between;
    padding: 10px 25px;
  `
);

const SiteTitle = styled(Flex)(
  ({ theme }) => css`
    cursor: pointer;
    h1 {
      color: ${theme.colors.text};
      margin-left: 0.5rem;
    }
  `
);

const Aside = styled.aside(
  ({ theme }) => css`
    ul {
      display: flex;
      margin-left: 0.5rem;
    }

    li {
      margin-right: 0.5rem;
    }

    a {
      color: ${theme.colors.brand.primary};
      &:first-of-type {
        margin-right: ${theme.space[3]};
      }
    }
  `
);

export default function Header({ auth, ...rest }) {
  return (
    <SiteHeader className={rest.className}>
      <Link href="/" passHref>
        <SiteTitle>
          <SkipNavLink />

          <Image src="/assets/icons/logo/small.svg" height="30" width="30" />
          <h1>til</h1>
        </SiteTitle>
      </Link>

      <Aside>
        <nav>
          {auth.user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <a
                href="#"
                title="Click to logout of your account"
                onClick={e => {
                  e.preventDefault();
                  auth.signout();
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link href="/login" replace>
                Login
              </Link>
              <Link href="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </Aside>
    </SiteHeader>
  );
}

Header.propTypes = {
  auth: PropTypes.object,
};
