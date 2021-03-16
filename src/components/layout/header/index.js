import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SkipNavLink } from '@components/core/skip-nav';
import { Link } from '@components/core/html';
import Logo from '@components/core/logo';

const SiteHeader = styled.header(
  ({ theme }) => css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 25px;

    nav {
      a:first-of-type {
        margin-right: ${theme.space[3]};
      }
    }
  `
);

export default function Header(props) {
  return (
    <SiteHeader className={props.className}>
      <SkipNavLink />
      <Logo />

      <nav>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </nav>
    </SiteHeader>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
