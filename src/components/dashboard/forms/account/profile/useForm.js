import * as React from 'react';
import * as yup from 'yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@lib/firebase/auth';
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
  const auth = useAuth();

  console.log(`auth`, auth);

  const methods = useBaseForm({
    mode: 'onBlur',
    defaultValues: formValues(user),
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(payload => {
    console.log(`Edit Profile cb:`);
    console.log(`Edit Profile payload:`, payload);

    return updateUser(user.uid, payload)
      .then(docRef => {
        console.log(`docRef`, docRef);

        return docRef;
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }, []);

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
    };
  }, [methods, onSubmit]);
}
