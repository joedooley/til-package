import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Text = React.forwardRef(({ align = 'center', children, ...rest }, ref) => {
  return (
    <p
      {...rest}
      ref={ref}
      css={theme => css`
        font-size: ${theme.fontSizes[3]};
        line-height: 21px;
        text-align: ${align};
      `}
    >
      {children}
    </p>
  );
});

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  children: PropTypes.node,
};

Text.displayName = 'Text';

export default Text;
