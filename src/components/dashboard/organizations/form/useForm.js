import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { client } from '@util/api-client';

const formValues = () => ({ name: '', billingEmail: '', billingContact: '' });
const schema = yup.object().shape({
  name: yup.string().required(),
  billingEmail: yup.string().email().required(),
  billingContact: yup.string().required(),
});

export default function useCreateOrganizationForm(user, mutateUser) {
  const router = useRouter();
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
      return client('/api/organizations/create', { body: { data: { ...payload }, user } })
        .then(response => {
          console.log(`response`, response);

          clearErrors();
          setSubmittedData(payload);
        })
        .catch(error => {
          console.error(`/api/organizations/create error`, error);

          return setError('code', { type: 'server', message: error.message });
        });
    },
    [user, clearErrors, setError]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
    };
  }, [errors, methods, onSubmit]);
}
