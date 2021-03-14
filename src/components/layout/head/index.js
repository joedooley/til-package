import * as React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

export default function Head({ meta, children }) {
  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={meta.description} />
      {children}
    </NextHead>
  );
}

Head.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};
