import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuLink = styled.a(
  ({ theme, isActive }) => css`
    align-items: center;
    color: ${isActive ? theme.colors.brand.primary : theme.colors.text};
    display: flex;
    font-size: ${theme.fontSizes[3]};
    font-weight: ${isActive ? theme.fontWeights.bold : theme.fontWeights.normal};
    line-height: ${theme.lineHeights.condensed};
    text-decoration: none;
  `
);

const MenuItem = React.forwardRef(({ href, onClick, children, ...rest }, ref) => {
  const router = useRouter();
  const isActive = router?.asPath === href;

  return (
    <Link {...rest} passHref href={href}>
      <MenuLink onClick={onClick} ref={ref} isActive={isActive}>
        {children}
      </MenuLink>
    </Link>
  );
});

MenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
