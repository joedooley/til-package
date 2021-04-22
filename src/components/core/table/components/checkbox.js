import * as React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  indeterminate: PropTypes.bool,
};

export default Checkbox;
