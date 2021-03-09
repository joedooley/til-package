import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Heading = React.forwardRef(({ level, align = 'center', children, ...rest }, ref) => {
  const Component = `h${level}`;

  return (
    <Component
      {...rest}
      ref={ref}
      css={css`
        text-align: ${align};
      `}
    >
      {children}
    </Component>
  );
});

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  children: PropTypes.node,
};

Heading.displayName = 'Heading';

export default Heading;
