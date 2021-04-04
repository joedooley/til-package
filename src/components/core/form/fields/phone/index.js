import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useController, useFormContext } from 'react-hook-form';
import Adornment from '../../adornment';
import CharacterCount from '../../character-count';
import Field from '../field';

const maskPhoneNumber = phone => {
  const x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
};

// eslint-disable-next-line no-unused-vars
const PhoneInput = React.forwardRef(({ name, label, prefix, ...rest }, _ref) => {
  const {
    field: { ref, onChange, ...inputProps },
  } = useController({ name });
  const { setValue } = useFormContext();

  const handleChange = React.useCallback(
    e => {
      const value = maskPhoneNumber(e.target.value);

      setValue(name, e.target.value.replace(/[- )(]/g, ''));
      onChange(value);
    },
    [name, onChange, setValue]
  );

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
      <input type="tel" ref={ref} name={name} onChange={handleChange} {...rest} {...inputProps} />
      {<CharacterCount max={rest.max} value={inputProps.value} />}
      {<Adornment value={prefix} />}
    </Field>
  );
});

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  prefix: PropTypes.any,
};

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
