import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';

const formValues = () => ({ phone: '' });
const schema = yup.object().shape({ phone: yup.string().required() });

export default function useLoginForm() {
  const { loginWithPhone } = useAuth();
  const [submittedData, setSubmittedData] = React.useState({});
  const [verificationId, setVerificationId] = React.useState(null);

  const methods = useBaseForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { errors } = formState;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.phone) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const onSubmit = React.useCallback(
    payload =>
      loginWithPhone(payload.phone)
        .then(response => {
          clearErrors();
          setSubmittedData(payload);
          setVerificationId(response);
        })
        .catch(error => setError('phone', { type: 'server', message: error.message })),
    [clearErrors, loginWithPhone, setError]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
      verificationId,
    };
  }, [methods, onSubmit, errors, verificationId]);
}
