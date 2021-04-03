import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';

const formValues = () => ({ email: '' });
const schema = yup.object().shape({ email: yup.string().email().required() });

export default function useEmailConfirmationForm() {
  const { loginWithEmailConfirmation: login } = useAuth();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useBaseForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { errors } = formState;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.email) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  React.useEffect(() => {
    const savedEmail = window.localStorage.getItem('emailForSignIn');

    if (savedEmail) {
      login(savedEmail)
        .then(() => {
          clearErrors();
          setSubmittedData(savedEmail);
        })
        .catch(error => setError('email', { type: 'server', message: error.message }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = React.useCallback(
    payload => {
      return login(payload.email)
        .then(() => {
          clearErrors();
          setSubmittedData(payload);
        })
        .catch(error => setError('email', { type: 'server', message: error.message }));
    },
    [clearErrors, setError, login]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
    };
  }, [errors, methods, onSubmit]);
}
