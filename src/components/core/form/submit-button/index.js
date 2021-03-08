import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { Button } from '@components/core/html';

export default function SubmitButton({ children, onSubmit, ...rest }) {
  const { handleSubmit } = useFormContext();

  return (
    <Button type="button" {...rest} onClick={handleSubmit(onSubmit)}>
      {children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};
