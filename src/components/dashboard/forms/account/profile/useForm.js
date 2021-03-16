import * as React from 'react';
import * as yup from 'yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '@lib/firebase/db.js';

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
  const methods = useBaseForm({
    mode: 'onBlur',
    defaultValues: formValues(user),
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(payload => {
    console.log(`useProfileForm cb:`);
    console.log(`useProfileForm payload:`, payload);

    return updateUser(user.uid, payload).catch(error => {
      console.error('Error adding document: ', error);
    });
  }, [user.uid]);

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
    };
  }, [methods, onSubmit]);
}
