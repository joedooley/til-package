import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Flex = React.forwardRef(
  ({ children, direction = 'row', vAlign = 'center', hAlign = 'flex-start', ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        css={css`
          align-items: ${vAlign};
          display: flex;
          flex-direction: ${direction};
          justify-content: ${hAlign};
        `}
      >
        {children}
      </div>
    );
  }
);

Flex.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['column', 'row']),
  vAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  hAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
};

Flex.displayName = 'Flex';

export default Flex;
