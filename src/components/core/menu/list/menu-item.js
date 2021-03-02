import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MenuLink = styled('a')(({ theme, isActive }) => ({
  alignItems: 'center',
  color: isActive ? theme.colors.green.primary : theme.colors.grey.secondary,
  display: 'flex',
  fontWeight: isActive ? theme.fontWeights.bold : theme.fontWeights.normal,
  fontSize: theme.fontSizes[3],
  lineHeight: theme.lineHeights.condensed,
  textDecoration: 'none',
}));

const MenuItem = React.forwardRef(({ item, onClick, ...rest }, ref) => {
  const router = useRouter();
  const isActive = router?.asPath === item.href;

  if (!__DEV__ && item.href === '/test') return null;

  return (
    <li {...rest} css={{ marginBottom: '8px', '&:last-child': { marginBottom: '0' } }}>
      <Link passHref href={item.href}>
        <MenuLink onClick={onClick} ref={ref} isActive={isActive}>
          {item.icon && (
            <span css={{ display: 'flex', marginRight: '4px' }}>
              <Image src={item.icon} height="18" width="18" css={{ marginRight: '4px' }} />
            </span>
          )}
          {item.value}
        </MenuLink>
      </Link>
    </li>
  );
});

MenuItem.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    protected: PropTypes.bool,
  }),
  onClick: PropTypes.func,
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
