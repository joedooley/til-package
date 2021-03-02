import * as React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import Autocomplete from '@components/core/autocomplete';

export default function SearchInput({ name, label, options, ...rest }) {
  const {
    field: { ref, ...inputProps },
  } = useController({ name });

  return <Autocomplete name={name} label={label} items={options} ref={ref} {...rest} {...inputProps} />;
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
