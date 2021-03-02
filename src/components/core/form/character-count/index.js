import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

export default function CharacterCount({ max, value, ...rest }) {
  const charCount = value?.length ?? 0;

  return max ? (
    <div
      {...rest}
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <small className="count">{`${charCount}/${max}`}</small>
    </div>
  ) : null;
}

CharacterCount.propTypes = {
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
