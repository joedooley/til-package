import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { css } from '@emotion/react';

const Link = React.forwardRef(({ href, onClick, align = 'center', children, ...rest }, ref) => {
  return (
    <NextLink {...rest} href={href} passHref={true}>
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={rest.className}
        css={theme => css`
          color: ${theme.colors.brand.primary};
          text-align: ${align};
          &:hover {
            color: ${theme.colors.brand.hover};
          }

          &:focus {
            color: ${theme.colors.brand.focus};
          }
        `}
      >
        {children}
      </a>
    </NextLink>
  );
});

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  children: PropTypes.node,
};

Link.displayName = 'Link';

export default Link;
