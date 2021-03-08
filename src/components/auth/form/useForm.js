import * as React from 'react';
import * as yup from 'yup';

const getFormValues = type => {
  const login = {
    email: '',
    password: '',
  };

  const signup = {
    username: '',
    ...login,
  };

  return type === 'login' ? login : signup;
};

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function useForm(type) {
  return React.useMemo(() => {
    return {
      schema,
      defaultValues: getFormValues(type),
      onSubmit: payload => console.log(`Form payload:`, payload),
    };
  }, [type]);
}
