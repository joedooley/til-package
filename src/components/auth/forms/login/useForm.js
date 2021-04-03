import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';

const formValues = () => ({ email: '' });
const schema = yup.object().shape({ email: yup.string().required() });

export default function useLoginForm(formType) {
  const { loginWithEmail, signup } = useAuth();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useBaseForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { errors } = formState;

  const loginAction = React.useCallback(
    (email, password) => (formType === 'login' ? loginWithEmail(email, password) : signup(email, password)),
    [formType, loginWithEmail, signup]
  );

  const onSubmit = React.useCallback(
    payload => {
      const { email, password } = payload;

      return loginAction(email, password);
    },
    [loginAction]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      submittedData,
    };
  }, [methods, onSubmit, submittedData]);
}
