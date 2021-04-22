/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTable, useFlexLayout, useRowSelect } from 'react-table';
import IndeterminateCheckbox from './components/checkbox';

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
        align-self: center;
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

export default function Table({ columns, data, options = {}, onRowSelect, ...rest }) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      ...options,
    },
    useFlexLayout,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          width: 20,
          Header: ({ getToggleAllRowsSelectedProps }) => <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  React.useEffect(() => {
    if (typeof onRowSelect === 'function') {
      onRowSelect(Object.keys(selectedRowIds));

      return () => onRowSelect(Object.keys(selectedRowIds));
    }
  }, [onRowSelect, selectedRowIds]);

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

        {data?.length && <div className="tfoot">{`Members: ${data.length}`}</div>}
      </div>
    </StyledTable>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object,
  onRowSelect: PropTypes.func,
};
