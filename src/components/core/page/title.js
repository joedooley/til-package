import * as React from 'react';
import PropTypes from 'prop-types';
import usePageTitle from '@hooks/usePageTitle';

export default function Title({ value, ...rest }) {
  return <h1 {...rest}>{usePageTitle(value)}</h1>;
}

Title.propTypes = {
  value: PropTypes.string,
};
