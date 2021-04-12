import * as React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { client } from '@util/api-client';

export const fetchOrganizations = url => {
  console.log(`Fetching org: ${url}`);

  return client(url).then(response => response.data);
};

export const useOrganizations = id => {
  const router = useRouter();
  const { data, error, mutate } = useSWR(
    () => (id !== undefined ? `/api/organizations/${id}` : null),
    fetchOrganizations
  );

  React.useEffect(() => {
    if (error) {
      console.log(`JSON.stringify(error)`, JSON.stringify(error));

      mutate(null);
      router.push('/dashboard/organizations');
    }
  }, [error, router, mutate]);

  return React.useMemo(
    () => ({
      data,
      error,
      loading: !error && !data,
      mutate,
    }),
    [data, error, mutate]
  );
};
