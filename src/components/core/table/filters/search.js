import * as React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'public/assets/icons/table/search.svg';

export default function SearchColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <div css={{ position: 'relative' }}>
      <input
        value={filterValue || ''}
        placeholder="Search by keyword"
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        onFocus={e => e.preventDefault()}
        css={theme => ({
          border: theme.borders.primary,
          borderRadius: theme.radii[5],
          padding: '4px 8px',
          width: '200px',
        })}
      />
      <SearchIcon css={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  );
}

SearchColumnFilter.propTypes = {
  column: PropTypes.object,
};
