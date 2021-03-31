import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';

const formValues = { email: '', password: '' };

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function useLoginForm(formType) {
  const { loginWithEmail, signup } = useAuth();

  const [formStep, setFormStep] = React.useState(1);
  const [submittedData, setSubmittedData] = React.useState({});
  const [confirmationResult, setConfirmationResult] = React.useState();

  const methods = useBaseForm({
    mode: 'onBlur',
    defaultValues: formValues,
    resolver: yupResolver(schema),
  });

  const { reset } = methods;

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

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
      formStep,
      setFormStep,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      submittedData,
      confirmationResult,
    };
  }, [confirmationResult, formStep, handleReset, methods, onSubmit, submittedData]);
}
