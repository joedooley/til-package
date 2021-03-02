import Link from 'next/link';
import PropTypes from 'prop-types';

export default function LinkCell({ href, value }) {
  return <Link href={href}>{value}</Link>;
}

LinkCell.propTypes = {
  href: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
