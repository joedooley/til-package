import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemberships } from '@hooks/useMemberships';
import { client } from '@util/api-client';

const formValues = () => ({ displayName: '', email: '', role: '' });
const schema = yup
  .object({
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
    }),
  })
  .noUnknown();

export default function useCreateOrgMemberForm(id, closeDialog) {
  const router = useRouter();
  const { mutate: mutateMemberships } = useMemberships();
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
      console.log(`payload`, payload);

      return client(`/api/organizations/${id}/members/create`, { body: { data: { ...payload } } })
        .then(response => {
          console.log(`response`, response);

          clearErrors();
          setSubmittedData(payload);
          mutateMemberships();
          closeDialog();
        })
        .catch(error => setError('name', { type: 'server', message: error.message }));
    },
    [id, clearErrors, setError, mutateMemberships, closeDialog]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
    };
  }, [errors, methods, onSubmit]);
}
