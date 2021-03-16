import * as React from 'react';
import PropTypes from 'prop-types';
import { signout } from '@lib/firebase/auth/client';
import MenuItem from '../menu-item';

export default function Menu({ items = [], ...rest }) {
  const handleLogout = React.useCallback(e => {
    e.preventDefault();

    return signout();
  }, []);

  return items.length ? (
    <nav {...rest}>
      <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map(x => (
          <li key={x.href} css={{ marginBottom: '1em' }}>
            {x.value !== 'Logout' ? (
              <MenuItem href={x.href}>{x.value}</MenuItem>
            ) : (
              <MenuItem href={x.href} onClick={e => handleLogout(e)}>
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
