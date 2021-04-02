import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '@hooks/useUser';
import { client } from '@util/api-client';

const formValues = user => {
  return {
    email: user?.email || '',
  };
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function useEmailForm() {
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
    if (formState.isSubmitSuccessful && !errors?.email) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

  const onSubmit = React.useCallback(
    payload => {
      return client('/api/user/profile/update', { body: { data: payload } })
        .then(() => {
          clearErrors();
          mutateUser({ ...user, email: payload.email });
          setSubmittedData(payload);
        })
        .catch(error => setError('email', { type: 'server', message: error.message }));
    },
    [clearErrors, mutateUser, setError, user]
  );

  return React.useMemo(() => {
    return {
      methods,
      isDirty,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      error: Object.keys(errors).length ? errors.email.message : false,
    };
  }, [errors, handleReset, isDirty, methods, onSubmit]);
}
