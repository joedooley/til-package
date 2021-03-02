import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Button from '@components/core/button';

export default function SubmitButton({ children, onSubmit, ...rest }) {
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Button type="button" disabled={!isDirty || isSubmitting} {...rest} onClick={handleSubmit(onSubmit)}>
      {children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};
