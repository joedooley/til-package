import * as React from 'react';
import useSWR from 'swr';
import { client } from '@util/api-client';

export const fetchOrganizations = url => {
  console.log(`Fetching org: ${url}`);

  return client(url).then(response => response.data);
};

export const useOrganizations = id => {
  const { data, error, mutate } = useSWR(
    () => (id !== undefined ? `/api/organizations/${id}` : null),
    fetchOrganizations
  );

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
