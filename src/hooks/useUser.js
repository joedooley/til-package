import * as React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { client } from '@util/api-client';

const fetchUser = () => {
  console.log(`getUser called`);

  return client('/api/user/me').then(response => response.data.user);
};

export const useUser = () => {
  const router = useRouter();
  const isDashboard = router.pathname.includes('dashboard');
  const { data, error, mutate: mutateUser } = useSWR(isDashboard ? '/api/user/me' : null, fetchUser);

  const userData = React.useMemo(
    () => ({
      user: data,
      loading: !error && !data,
      mutateUser,
    }),
    [data, error, mutateUser]
  );

  React.useEffect(() => {
    if (isDashboard && error) {
      console.log(`JSON.stringify(error)`, JSON.stringify(error));

      mutateUser(null, false);
      router.replace('/login');
    }
  }, [isDashboard, error, router, mutateUser]);

  return userData;
};
