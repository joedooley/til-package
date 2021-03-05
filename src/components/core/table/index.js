/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTable, useSortBy, useFilters, usePagination, useExpanded } from 'react-table';
import Pagination from './pagination';
import SortIcon from 'public/assets/icons/table/sort.svg';

const base = ({ theme }) => css`
  border-spacing: 0;
  margin-bottom: ${theme.space[3]};
  overflow: hidden;
  width: 100%;

  thead {
    box-shadow: ${theme.shadows.thead};
  }

  .th-wrap {
    align-items: center;
    display: flex;

    & > span {
      margin-right: ${theme.space[1]};
    }

    .sortable {
      color: ${theme.colors.brand.primary};
      display: flex;
    }
  }

  th,
  td {
    border-bottom: ${theme.borders.primary};
    margin: 0;
    text-align: left;

    &:first-of-type {
      padding-left: ${theme.space[4]};
    }
  }

  th {
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes[0]};
    line-height: 18px;
    text-transform: uppercase;
    padding-bottom: 6px;
    padding-right: 0;
    padding-top: 6px;

    &:last-of-type {
      padding-right: 60px;
    }
  }

  .th-wrap {
    align-items: center;
    display: flex;

    & > span {
      margin-right: 6px;
    }

    .sortable {
      color: ${theme.colors.brand.primary};
      display: flex;
    }
  }

  td {
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes[2]};
    line-height: ${theme.lineHeights.default};
    padding-bottom: 10px;
    padding-top: 10px;
  }

  a {
    font-size: ${theme.fontSizes[2]};
    font-weight: ${theme.fontWeights.bold};
  }
`;

const StyledTable = styled('table')`
  ${base}
`;

const StyledPagination = styled(Pagination)(props => ({
  paddingLeft: props.theme.space[4],
  paddingRight: props.theme.space[4],
}));

export default function Table({ columns, data, defaultColumn = {}, options = {}, updateData, skipPageReset, ...rest }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes: options.filterTypes,
      disableFilters: options?.disableFilters,
      disableSortBy: options?.sorting?.sortBy?.length === 0,
      autoResetPage: !skipPageReset,
      updateData,
      initialState: {
        hiddenColumns: options.initialState?.hiddenColumns || [],
        sortBy: options.sorting.sortBy,
        pageSize: options.pageSize || 20,
        pageIndex: options.pageIndex || 0,
        filters: options.initialState?.filters || [],
      },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const tableData = options.usePagination ? page : rows;

  return (
    <>
      <StyledTable {...getTableProps()} {...rest}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <th
                    {...column.getHeaderProps([
                      {
                        style: column.style,
                        className: column.className,
                      },
                      { ...column?.getSortByToggleProps() },
                    ])}
                  >
                    <div className="th-wrap">
                      <span className="header">{column.render('Header')}</span>
                      {column.canSort && (
                        <span className="sortable">
                          <SortIcon />
                        </span>
                      )}
                      {!options.disableFilters && column.canFilter ? (
                        <div className="filterable">{column.render('Filter')}</div>
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tableData.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      {options.usePagination && (
        <StyledPagination
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
        />
      )}
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.any,
  defaultColumn: PropTypes.object,
  options: PropTypes.object,
  updateData: PropTypes.func,
  skipPageReset: PropTypes.bool,
};
