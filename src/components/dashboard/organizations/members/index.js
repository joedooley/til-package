/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { utcToDate } from '@util/date';
import { client } from '@util/api-client';
import { useOrgMembers } from '@hooks/useOrgMembers';
import { Flex, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import Table from '@components/core/table';
import Popover from '@components/core/popover';
import CreateOrgMemberDialog from '@components/dashboard/organizations/members/create/dialog';
import TrashIcon from 'public/assets/icons/trashcan.svg';

export default function OrgMembersTable({ organization, ...rest }) {
  const [isOpen, toggleDialog] = useDialog();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const hasSelections = selectedRows.length > 0;

  const { members, mutate } = useOrgMembers(organization?.id);

  const options = React.useMemo(
    () => ({
      getRowId: row => row.uid,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 150,
      },
      {
        Header: 'Role',
        accessor: 'role',
        width: 80,
        Cell: ({ row }) => <p className="role">{row.values.role}</p>,
      },
      {
        Header: 'Since',
        accessor: 'created',
        width: 80,
        Cell: ({ row }) => utcToDate(row.values.created, false),
      },
      {
        Header: 'Updated',
        accessor: 'updated',
        width: 80,
        Cell: ({ row }) => utcToDate(row.values.updated, false),
      },
    ],
    []
  );

  const currentMembers = React.useMemo(() => members, [members]);

  const handleRemoveMembers = React.useCallback(() => {
    const orgId = organization.id;
    console.log(`Removing the following members:`, selectedRows);

    return client(`/api/organizations/${orgId}/members/delete`, {
      body: { orgId, ids: selectedRows },
    })
      .then(response => {
        console.log(`response`, response);

        mutate();
      })
      .catch(error => console.error(error));
  }, [organization, selectedRows, mutate]);

  return (
    <>
      <Flex
        className={rest.className}
        css={theme => css`
          flex-direction: column;

          & > div {
            width: 100%;

            &:first-of-type {
              justify-content: space-between;
              margin-bottom: ${theme.space[3]};
            }
          }
        `}
      >
        <Flex>
          {hasSelections && (
            <Popover
              align="start"
              positions={['bottom', 'right']}
              css={theme => css`
                & > div {
                  align-items: center;
                  padding: ${theme.space[3]};

                  &:hover {
                    background-color: ${theme.colors.black[600]};
                    cursor: pointer;
                  }
                }

                p {
                  color: ${theme.colors.text};
                  font-size: ${theme.fontSizes[4]};
                  margin-bottom: 0;
                  margin-left: 10px;
                }
              `}
            >
              <Flex onClick={handleRemoveMembers}>
                <TrashIcon />
                <p>Remove Member</p>
              </Flex>
              <Flex>
                <TrashIcon />
                <p>Remove Member</p>
              </Flex>
            </Popover>
          )}

          <Button onClick={toggleDialog} ariaLabel="Click button to open dialog and invite members to the organization">
            Invite
          </Button>
        </Flex>

        <Table {...rest} columns={columns} data={currentMembers} options={options} onRowSelect={setSelectedRows} />
      </Flex>

      {isOpen && (
        <CreateOrgMemberDialog
          isOpen={isOpen}
          onClose={toggleDialog}
          currentMembers={currentMembers}
          organization={organization}
          mutate={mutate}
        />
      )}
    </>
  );
}

OrgMembersTable.propTypes = {
  organization: PropTypes.object,
};
