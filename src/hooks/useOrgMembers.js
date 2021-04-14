import * as React from 'react';
import useSWR from 'swr';
import { client } from '@util/api-client';

export const fetchMembers = url => {
  console.log(`fetchMembers called: ${url}`);

  return client(url).then(response => response.data);
};

export const useOrgMembers = id => {
  const { data, error, mutate } = useSWR(
    () => (id !== undefined ? `/api/organizations/${id}/members` : null),
    fetchMembers
  );

  return React.useMemo(
    () => ({
      members: data || [],
      membersError: error,
      membersLoading: !error && !data,
      mutate,
    }),
    [data, error, mutate]
  );
};
