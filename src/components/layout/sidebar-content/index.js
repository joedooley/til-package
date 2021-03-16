import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { app as constants } from '@util/constants';
import { SkipNavContent } from '@components/core/skip-nav';
import Head from '../head';
import Header from '../header';

export default function Layout({ children }) {
  return (
    <>
      <Head meta={constants.meta} />

      <Header
        css={theme => css`
          border-bottom: ${theme.borders.secondary};
        `}
      />

      <main
        css={css`
          display: flex;
          min-height: 100vh;
        `}
      >
        <article
          css={theme => css`
            align-content: flex-start;
            border-left: ${theme.borders.secondary};
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding: ${theme.space[4]};
          `}
        >
          <SkipNavContent>{children}</SkipNavContent>
        </article>
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
