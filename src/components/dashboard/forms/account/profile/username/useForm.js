import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '@hooks/useUser';
import { client } from '@util/api-client';

const formValues = user => {
  return {
    username: user?.username || '',
  };
};

const schema = yup.object().shape({
  username: yup.string().required().min(2).max(48).trim(),
});

export default function useUsernameForm() {
  const { user, mutateUser } = useUser();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useBaseForm({
    mode: 'onChange',
    defaultValues: formValues(user),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { isDirty, errors } = formState;

  React.useEffect(() => {
    reset({ ...formValues(user) });
  }, [user, reset]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.username) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

  // @TODO Fix error handling. Server errors are missing from the error response
  // @TODO Double check api-client.js first.
  const onSubmit = React.useCallback(
    payload => {
      return client('/api/user/profile/update', { body: { data: payload } })
        .then(() => {
          clearErrors();
          mutateUser({ ...user, username: payload.username });
          setSubmittedData(payload);
        })
        .catch(error => setError('username', { type: 'server', message: error.message }));
    },
    [clearErrors, mutateUser, setError, user]
  );

  return React.useMemo(() => {
    return {
      methods,
      isDirty,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      error: errors?.username?.message,
    };
  }, [errors, handleReset, isDirty, methods, onSubmit]);
}
