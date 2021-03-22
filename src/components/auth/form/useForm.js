import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { signInWithPhoneNumber } from '@lib/firebase/auth/client';

const formValues = { phone: '' };

const schema = yup.object().shape({
  phone: yup.string().required(),
});

export default function useLoginForm() {
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

  const onSubmit = React.useCallback(payload => {
    const { phone } = payload;
    console.log(`useLoginForm payload:`, payload);

    return signInWithPhoneNumber(phone)
      .then(response => console.log(`response`, response))
      .catch(error => console.error('signInWithPhoneNumber error: ', JSON.stringify(error)));
  }, []);

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
