import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { client } from '@util/api-client';
import { useMemberships } from '@hooks/useMemberships';

const formValues = () => ({ name: '', phrase: '' });
const schema = yup.object().shape({ name: yup.string().required(), phrase: yup.string().required() });

export default function useDeleteOrganizationForm(org, phrase) {
  const router = useRouter();
  const { mutate: mutateMemberships } = useMemberships();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useForm({
    mode: 'onChange',
    defaultValues: formValues(),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors, watch } = methods;
  const { errors } = formState;

  const fields = watch();

  const isDisabled = React.useMemo(() => {
    const name = org?.name;

    return fields.name !== name || fields.phrase !== phrase;
  }, [fields, org, phrase]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.code) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const onSubmit = React.useCallback(
    payload => {
      const id = org?.id;

      return client('/api/organizations/delete', { body: { id } })
        .then(() => {
          clearErrors();
          setSubmittedData(payload);
          router.replace('/dashboard/organizations');
          mutateMemberships();
        })
        .catch(error => setError('code', { type: 'server', message: error.message }));
    },
    [org, router, mutateMemberships, clearErrors, setError]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
      isDisabled,
    };
  }, [errors, methods, onSubmit, isDisabled]);
}
