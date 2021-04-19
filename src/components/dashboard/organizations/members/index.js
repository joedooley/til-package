/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { utcToDate } from '@util/date';
import { Flex, Heading, Button } from '@components/core/html';
import useDialog from '@hooks/useDialog';
import Table from '@components/core/table';
import CreateOrgMemberDialog from '@components/dashboard/organizations/members/create/dialog';

export default function OrgMembersTable({ id, data, ...rest }) {
  const [isOpen, toggleDialog] = useDialog();

  const options = React.useMemo(
    () => ({
      defaultColumn: {
        minWidth: 30,
        width: 150,
        maxWidth: 200,
      },
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

  const members = React.useMemo(() => data, [data]);

  return (
    <>
      <Flex
        css={theme => css`
          flex-direction: column;

          & > div {
            width: 100%;

            &:first-of-type {
              justify-content: flex-end;
              margin-bottom: ${theme.space[3]};
            }
          }
        `}
      >
        <Flex>
          <Button onClick={toggleDialog} ariaLabel="Click button to open dialog with a user invitation form">
            Invite User
          </Button>
        </Flex>

        <Table {...rest} columns={columns} data={members} options={options} />
      </Flex>

      {isOpen && <CreateOrgMemberDialog id={id} isOpen={isOpen} onClose={toggleDialog} />}
    </>
  );
}

OrgMembersTable.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
};
