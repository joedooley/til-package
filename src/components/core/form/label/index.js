import PropTypes from 'prop-types';

export default function Label({ children, ...rest }) {
  return <label {...rest}>{children}</label>;
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
};
