import PropTypes from 'prop-types';
import { Link } from '@components/core/html';

export default function LinkCell({ href, value }) {
  return <Link href={href}>{value}</Link>;
}

LinkCell.propTypes = {
  href: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
