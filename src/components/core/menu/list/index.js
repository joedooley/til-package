import PropTypes from 'prop-types';
import MenuItem from './menu-item';
import { SkipNavLink } from '@components/core/skip-nav';

export default function Menu({ items = [] }) {
  return items.length ? (
    <>
      <SkipNavLink />

      <nav>
        <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map(x => (
            <MenuItem key={x.href} item={x} />
          ))}
        </ul>
      </nav>
    </>
  ) : null;
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.string,
      protected: PropTypes.bool,
    })
  ),
};
