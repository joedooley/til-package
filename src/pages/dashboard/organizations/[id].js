import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useOrganizations } from '@hooks/useOrganizations';
import { Flex, Heading, Button, Link, Spacer, Text } from '@components/core/html';
import DeleteOrganization from '@components/dashboard/organizations/delete';

export default function OrganizationPage(props) {
  const router = useRouter();
  const { data, loading } = useOrganizations(router.query?.id);

  console.log(`router`, router);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={props.className}
      css={css`
        width: 100%;
      `}
    >
      <Heading level={1}>{`${data.name} settings`}</Heading>
      <DeleteOrganization />
      <pre>
        <code>{JSON.stringify(data)}</code>
      </pre>
    </Flex>
  );
}

OrganizationPage.propTypes = {
  className: PropTypes.string,
};
