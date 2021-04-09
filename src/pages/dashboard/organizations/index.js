import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { getCollection } from '@lib/firebase/db-admin';
import { Flex, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import CreateOrgDialog from '@components/dashboard/organizations/dialog';
import EmptyState from '@components/dashboard/empty-state';

export async function getStaticProps() {
  const { entries } = await getCollection('organizations');

  return {
    props: { initialData: entries },
  };
}

export default function OrganizationsPage({ initialData, ...rest }) {
  const [data, setData] = React.useState(initialData);
  const [isOpen, toggleDialog] = useDialog();

  console.log(`data`, data);

  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={rest.className}
      css={css`
        width: 100%;
      `}
    >
      {data.length ? (
        <Button
          ariaLabel="Click button to add a new project"
          onClick={toggleDialog}
          css={theme => css`
            margin-top: ${theme.space[5]};
          `}
        >
          New Organization
        </Button>
      ) : (
        <EmptyState onActionClick={toggleDialog} heading="Create an organization" btnLabel="Create Organization" />
      )}

      {isOpen && <CreateOrgDialog isOpen={isOpen} onClose={toggleDialog} />}
    </Flex>
  );
}

OrganizationsPage.propTypes = {
  initialData: PropTypes.array,
};
