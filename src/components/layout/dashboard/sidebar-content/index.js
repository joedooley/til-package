import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { app as constants } from '@util/constants';
import Head from '../../head';
import Sidebar from '../sidebar';
import Content from '../content';

export default function DashboardLayout({ children }) {
  const siteTitle = constants.site.title;

  return (
    <>
      <Head meta={constants.meta} />

      <main
        css={css`
          display: flex;
          min-height: 100vh;
        `}
      >
        <Sidebar siteTitle={siteTitle} />
        <Content siteTitle={siteTitle}>{children}</Content>
      </main>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
