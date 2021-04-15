/* eslint-disable react/prop-types */
import '@reach/tabs/styles.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { utcToDate } from '@util/date';
import { useTable, useFlexLayout } from 'react-table';

const StyledTable = styled.div(
  ({ theme }) => css`
    box-shadow: ${theme.shadows.modal};
    display: block;
    overflow: auto;

    .table {
      border-spacing: 0;
      border: 1px solid black;

      .thead {
        background-color: ${theme.colors.black[600]};
        overflow-y: auto;
        overflow-x: hidden;
      }

      .th {
        color: ${theme.colors.black[750]};
        font-size: ${theme.fontSizes[3]};
        font-weight: ${theme.fontWeights.bold};
        margin: 0;
        padding: ${theme.space[3]} ${theme.space[4]};
      }

      .tbody {
        background-color: ${theme.colors.black[400]};
        border-bottom: ${theme.borders.secondary};
        border-bottom-color: ${theme.colors.black[700]};
        max-height: 250px;
        overflow-y: scroll;
        overflow-x: hidden;
      }

      .tr {
        border-bottom: 1px solid ${theme.colors.black[700]};

        &:last-child {
          border-bottom: 0;
        }
      }

      .td {
        color: ${theme.colors.black[750]};
        font-size: ${theme.fontSizes[3]};
        margin: 0;
        padding: ${theme.space[4]};

        p {
          color: ${theme.colors.black[750]};
          font-size: ${theme.fontSizes[3]};
          margin-bottom: 0;
        }

        .role {
          text-transform: capitalize;
        }
      }

      .tfoot {
        background-color: ${theme.colors.black[400]};
        color: ${theme.colors.black[700]};
        font-size: ${theme.fontSizes[3]};
        padding: ${theme.space[4]};
      }
    }
  `
);

export default function OrganizationMembersTable({ columns, data, ...rest }) {
  const tableOptions = React.useMemo(
    () => ({
      defaultColumn: {
        minWidth: 30,
        width: 150,
        maxWidth: 200,
      },
    }),
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      ...tableOptions,
    },
    useFlexLayout
  );

  return (
    <StyledTable className={rest.className}>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps({})} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tbody">
          {rows.map(row => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {data?.length && <div className="tfoot">{`${data.length} user`}</div>}
      </div>
    </StyledTable>
  );
}

export const TempTable = ({ data, ...rest }) => {
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

  return <OrganizationMembersTable {...rest} columns={columns} data={members} />;
};

OrganizationMembersTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

TempTable.propTypes = {
  data: PropTypes.array,
};
