import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Link = styled('a')(({ theme, isActive }) => ({
  alignItems: 'center',
  color: isActive ? theme.colors.green.primary : theme.colors.grey.secondary,
  display: 'flex',
  fontWeight: isActive ? theme.fontWeights.bold : theme.fontWeights.normal,
  fontSize: theme.fontSizes[3],
  lineHeight: theme.lineHeights.condensed,
  textDecoration: 'none',
}));

const MenuLink = React.forwardRef(({ href, onClick, children, ...props }, ref) => {
  const router = useRouter();

  return (
    <Link href={href} onClick={onClick} ref={ref} active={router?.asPath === href} {...props}>
      {children}
    </Link>
  );
});

MenuLink.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

MenuLink.displayName = 'MenuLink';

export default MenuLink;
