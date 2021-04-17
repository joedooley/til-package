/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { utcToDate } from '@util/date';
import Table from '@components/core/table';

export default function OrgMembersTable({ data, ...rest }) {
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

  return <Table {...rest} columns={columns} data={members} options={options} />;
}

OrgMembersTable.propTypes = {
  data: PropTypes.array,
};
