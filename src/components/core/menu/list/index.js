import PropTypes from 'prop-types';
import MenuItem from '../menu-item';

export default function Menu({ items = [], ...rest }) {
  return items.length ? (
    <nav {...rest}>
      <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map(x => (
          <li key={x.href} css={{ marginBottom: '1em' }}>
            <MenuItem href={x.href}>{x.value}</MenuItem>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
