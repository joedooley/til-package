import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Text = React.forwardRef(({ children, align = 'center', variant, ...rest }, ref) => {
  return (
    <p
      {...rest}
      ref={ref}
      css={theme => css`
        color: ${variant === 'error' && theme.colors.error.primary};
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
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  variant: PropTypes.oneOf(['error']),
};

Text.displayName = 'Text';

export default Text;
