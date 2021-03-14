import * as React from 'react';
import * as yup from 'yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPost } from '@lib/firebase/db.js';

const formValues = {
  name: '',
  billingEmail: '',
};

const schema = yup.object().shape({
  name: yup.string().required(),
  billingEmail: yup.string(),
});

export default function useOrganizationForm() {
  const methods = useBaseForm({
    defaultValues: formValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(payload => {
    console.log(`Organization onSubmit cb:`);
    console.log(`Organization Form payload:`, payload);

    return createPost(payload)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
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
