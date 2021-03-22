import PropTypes from 'prop-types';
import { useAuth } from '@hooks/useAuth';
import MenuItem from '../menu-item';

export default function Menu({ items = [], ...rest }) {
  const { logout } = useAuth();

  return items.length ? (
    <nav {...rest}>
      <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map(x => (
          <li key={x.href} css={{ marginBottom: '1em' }}>
            {x.value !== 'Logout' ? (
              <MenuItem href={x.href}>{x.value}</MenuItem>
            ) : (
              <MenuItem href={x.href} onClick={e => logout(e)}>
                {x.value}
              </MenuItem>
            )}
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
