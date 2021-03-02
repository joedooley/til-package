import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export default function Adornment({ value, ...rest }) {
  return value ? (
    <span
      {...rest}
      css={css`
        bottom: 13%;
        left: 6px;
        position: absolute;
      `}
    >
      {value}
    </span>
  ) : null;
}

Adornment.propTypes = {
  value: PropTypes.string,
};
