import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Box = React.forwardRef(({ children, as, ...rest }, ref) => {
  const Component = as ?? 'div';

  return (
    <Component
      {...rest}
      ref={ref}
      css={css`
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      `}
    >
      {children}
    </Component>
  );
});

Box.propTypes = {
  children: PropTypes.node,
  as: PropTypes.string,
};

Box.displayName = 'Box';

export default Box;
