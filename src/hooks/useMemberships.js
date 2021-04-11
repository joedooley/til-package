import * as React from 'react';
import useSWR from 'swr';
import { client } from '@util/api-client';

export const fetchMemberships = () => {
  console.log(`fetchMemberships called`);

  return client('/api/user/memberships').then(response => response.data);
};

export const useMemberships = () => {
  const { data, error, mutate } = useSWR('/api/user/memberships', fetchMemberships);

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
