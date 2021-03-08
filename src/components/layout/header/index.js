import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SkipNavLink } from '@components/core/skip-nav';
import { Link } from '@components/core/html';
import Logo from '@components/core/logo';

export const SiteHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 25px;
`;

export default function Header({ auth, ...rest }) {
  return (
    <SiteHeader className={rest.className}>
      <SkipNavLink />
      <Logo />

      <nav
        css={theme => css`
          a {
            &:first-of-type {
              margin-right: ${theme.space[3]};
            }
          }
        `}
      >
        {auth.user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link
              href="/?logout"
              title="Click to logout of your account"
              onClick={e => {
                e.preventDefault();
                auth.signout();
              }}
            >
              Logout
            </Link>
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
    </SiteHeader>
  );
}

Header.propTypes = {
  auth: PropTypes.object,
};
