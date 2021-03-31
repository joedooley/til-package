import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { client } from '@util/api-client';

const formValues = () => {
  return {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
};

const schema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required(),
  confirmNewPassword: yup.string().required(),
});

export default function usePasswordForm() {
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useBaseForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { isDirty, errors } = formState;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData]);

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

  const onSubmit = React.useCallback(
    payload => {
      return client('/api/user/profile/update', { body: { data: payload } })
        .then(() => {
          clearErrors();
          setSubmittedData(payload);
        })
        .catch(error => setError('email', { type: 'server', message: error.message }));
    },
    [clearErrors, setError]
  );

  return React.useMemo(() => {
    return {
      methods,
      isDirty,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
    };
  }, [handleReset, isDirty, methods, onSubmit, errors]);
}
