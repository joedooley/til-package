import * as React from 'react';
import PropTypes from 'prop-types';
import { css, useTheme } from '@emotion/react';

const Spacer = React.forwardRef(({ x, y, inline, ...rest }, ref) => {
  const theme = useTheme();

  const left = typeof x === 'string' ? x : theme.space[x];
  const top = typeof y === 'string' ? y : theme.space[y];

  return (
    <span
      {...rest}
      ref={ref}
      aria-hidden={true}
      css={css`
        display: ${inline ? 'inline-block' : 'block'};
        height: 1px;
        width: 1px;
        min-width: 1px;
        min-height: 1px;
        margin-left: ${x && left};
        margin-top: ${y && top};
      `}
    />
  );
});

Spacer.propTypes = {
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inline: PropTypes.bool,
};

Spacer.displayName = 'Spacer';

const MemoSpacer = React.memo(Spacer);

export default MemoSpacer;
