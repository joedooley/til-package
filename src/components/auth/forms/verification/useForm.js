import * as React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';

const formValues = () => ({ code: '' });
const schema = yup.object().shape({ code: yup.string().required() });

export default function usePhoneVerificationForm(verificationId) {
  const { loginWithPhoneCode: login } = useAuth();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { errors } = formState;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.code) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const onSubmit = React.useCallback(
    payload => {
      console.log(`verificationId`, verificationId);
      console.log(`payload.code`, payload.code);

      return login(verificationId, payload.code)
        .then(response => {
          console.log(`loginWithPhoneCode response`, response);

          clearErrors();
          setSubmittedData(payload);
        })
        .catch(error => setError('code', { type: 'server', message: error.message }));
    },
    [clearErrors, setError, login, verificationId]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
    };
  }, [errors, methods, onSubmit]);
}
