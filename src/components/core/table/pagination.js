import PropTypes from 'prop-types';

export default function Pagination({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  ...rest
}) {
  return (
    <div className={`${rest.className} pagination`}>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>
      <span>
        Page
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
    </div>
  );
}

Pagination.propTypes = {
  gotoPage: PropTypes.func,
  canPreviousPage: PropTypes.bool,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  canNextPage: PropTypes.bool,
  pageCount: PropTypes.number,
  pageIndex: PropTypes.number,
  pageOptions: PropTypes.arrayOf(PropTypes.number),
};
