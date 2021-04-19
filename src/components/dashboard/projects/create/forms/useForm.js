import * as React from 'react';
import * as yup from 'yup';
import { useForm as useBaseForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPost } from '@lib/firebase/db.js';

const formValues = {
  title: '',
  content: '',
  categories: '',
};

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  categories: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
  }),
});

export default function usePostForm() {
  const methods = useBaseForm({
    defaultValues: formValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = React.useCallback(
    payload => {
      console.log(`onSubmit cb:`);
      console.log(`Form payload:`, payload);

      return createPost(payload)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
          console.log(`docRef`, docRef);

          return docRef;
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    },
    []
  );

  return React.useMemo(() => {
    return {
      methods,
      handleSubmit: methods.handleSubmit(payload => onSubmit(payload)),
    };
  }, [methods, onSubmit]);
}
