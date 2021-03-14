import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useController } from 'react-hook-form';
import Adornment from '../../adornment';
import CharacterCount from '../../character-count';
import Field from '../field';

// eslint-disable-next-line no-unused-vars
const Input = React.forwardRef(({ name, label, prefix, ...rest }, _ref) => {
  const {
    field: { ref, ...inputProps },
  } = useController({ name, rules: { valueAsNumber: rest.type === 'number' } });

  return (
    <Field
      name={name}
      label={label}
      required={rest.required}
      className={rest.className}
      css={theme => css`
        position: relative;

        input {
          padding-left: ${prefix ? theme.space[4] : '8px'};
        }
      `}
    >
      <input ref={ref} name={name} {...inputProps} />
      {<CharacterCount max={rest.max} value={inputProps.value} />}
      {<Adornment value={prefix} />}
    </Field>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  prefix: PropTypes.any,
};

Input.displayName = 'Input';

export default Input;
