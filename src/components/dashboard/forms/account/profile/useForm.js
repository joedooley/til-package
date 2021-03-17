import * as React from 'react';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '@lib/firebase/db';

const formValues = user => {
  return {
    name: user.name,
    email: user.email,
  };
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});

export default function useProfileForm(user) {
  const [submittedData, setSubmittedData] = React.useState({});

  const methods = useBaseForm({
    mode: 'onBlur',
    defaultValues: formValues(user),
    resolver: yupResolver(schema),
  });

  const { uid } = user;
  const { formState, reset } = methods;
  const { isDirty } = formState;

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [formState, reset, submittedData]);

  const handleReset = React.useCallback(() => (isEmpty(submittedData) ? reset() : reset({ ...submittedData })), [
    reset,
    submittedData,
  ]);

  const onSubmit = React.useCallback(
    payload => {
      console.log(`useProfileForm payload:`, payload);

      return updateUser(uid, payload)
        .then(() => setSubmittedData(payload))
        .catch(error => console.error('updateUser error: ', error));
    },
    [uid]
  );

  return React.useMemo(() => {
    return {
      methods,
      isDirty,
      handleReset,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
    };
  }, [handleReset, isDirty, methods, onSubmit]);
}
