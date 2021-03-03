import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export default function Flex({ children, direction = 'row', vAlign = 'center', hAlign = 'flex-start' }) {
  return (
    <div
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

Flex.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['column', 'row']),
  vAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  hAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
};
