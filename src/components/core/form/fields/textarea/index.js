import * as React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import Field from '../field';
import CharacterCount from '../../character-count';

// eslint-disable-next-line no-unused-vars
const Textarea = React.forwardRef(({ name, label, ...rest }, _ref) => {
  const {
    field: { ref, ...inputProps },
  } = useController({ name });

  return (
    <Field name={name} label={label} required={rest.required} className={rest.className}>
      <textarea {...rest} ref={ref} name={name} {...inputProps} />
      {<CharacterCount max={rest.max} value={inputProps.value} />}
    </Field>
  );
});

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Textarea.displayName = 'Textarea';

export default Textarea;
