import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export default function VisuallyHidden({ children }) {
  return (
    <span
      css={css({
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      })}
    >
      {children}
    </span>
  );
}

VisuallyHidden.propTypes = {
  children: PropTypes.node,
};
