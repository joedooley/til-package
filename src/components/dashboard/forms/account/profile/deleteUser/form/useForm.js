import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { client } from '@util/api-client';

const formValues = () => ({ username: '', phrase: '' });
const schema = yup.object().shape({ username: yup.string().required(), phrase: yup.string().required() });

export default function useDeleteUserForm(user, phrase, mutateUser) {
  const router = useRouter();
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
    const username = user?.username;

    return fields.username !== username || fields.phrase !== phrase;
  }, [fields, user, phrase]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !errors?.code) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const onSubmit = React.useCallback(
    payload => {
      const uid = user?.uid;

      return client('/api/user/delete', { body: { uid } })
        .then(() => {
          router.replace('/login');
          mutateUser(null, false);
          clearErrors();
          setSubmittedData(payload);
        })
        .catch(error => setError('code', { type: 'server', message: error.message }));
    },
    [user, router, mutateUser, clearErrors, setError]
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
