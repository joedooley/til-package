import * as React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { client } from '@util/api-client';
import { useMemberships } from '@hooks/useMemberships';

const formValues = data => ({ name: data.name, billingEmail: data.billingEmail, billingContact: data.billingContact });
const schema = yup.object().shape({
  name: yup.string().required(),
  billingEmail: yup.string().required(),
  billingContact: yup.string().required(),
});

export default function useEditOrganizationForm(org) {
  const router = useRouter();
  const { mutate: mutateMemberships } = useMemberships();
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useForm({
    mode: 'onChange',
    defaultValues: formValues(org),
    resolver: yupResolver(schema),
  });

  const { formState, reset, setError, clearErrors } = methods;
  const { errors, isDirty } = formState;

  React.useEffect(() => {
    reset({ ...formValues(org) });
  }, [org, reset]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful && !Object.keys(errors).length) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData, errors]);

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

  const onSubmit = React.useCallback(
    payload => {
      const id = org?.id;

      return client(`/api/organizations/${id}/update`, { body: { data: payload } })
        .then(response => {
          clearErrors();
          setSubmittedData(payload);
          mutateMemberships();

          if (response.data.slug !== router.query.slug) {
            router.push(`/dashboard/organizations/${response.data.slug}`);
          }
        })
        .catch(error => setError('server', { type: 'server', message: error.message }));
    },
    [org?.id, clearErrors, mutateMemberships, router, setError]
  );

  return React.useMemo(() => {
    return {
      methods,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
      errors,
      isDirty,
    };
  }, [errors, methods, handleReset, onSubmit, isDirty]);
}
