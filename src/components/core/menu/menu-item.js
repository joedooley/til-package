import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from '@components/core/html';
import { useRouter } from 'next/router';

const MenuLink = styled(Link)(
  ({ theme, isActive }) => css`
    color: ${isActive ? theme.colors.brand.primary : theme.colors.text};
    font-size: ${theme.fontSizes[3]};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.condensed};
  `
);

const MenuItem = React.forwardRef(({ href, onClick, children, ...rest }, ref) => {
  const router = useRouter();
  const isActive = router?.asPath === href;

  return (
    <MenuLink {...rest} ref={ref} href={href} onClick={onClick} isActive={isActive}>
      {children}
    </MenuLink>
  );
});

MenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
