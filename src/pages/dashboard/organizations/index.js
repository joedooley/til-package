import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useMemberships } from '@hooks/useMemberships';
import { Flex, Button, Spacer } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import OrgList from '@components/dashboard/organizations/list';
import CreateOrgDialog from '@components/dashboard/organizations/create/dialog';
import EmptyState from '@components/dashboard/empty-state';

export default function OrganizationsPage(props) {
  const [isOpen, toggleDialog] = useDialog();
  const { data, loading } = useMemberships();

  console.log(`data`, data);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isOpen) {
    return <CreateOrgDialog isOpen={isOpen} onClose={toggleDialog} />;
  }

  if (!data.length) {
    return <EmptyState onActionClick={toggleDialog} heading="Create an organization" btnLabel="Create Organization" />;
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
      <Button
        ariaLabel="Click button to add a new project"
        onClick={toggleDialog}
        css={theme => css`
          margin-top: ${theme.space[5]};
        `}
      >
        New Organization
      </Button>

      <Spacer y={4} />

      <OrgList items={data} />
    </Flex>
  );
}

OrganizationsPage.propTypes = {
  className: PropTypes.string,
};
