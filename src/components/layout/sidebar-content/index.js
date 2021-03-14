import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useAuth } from '@lib/firebase/auth';
import { app as constants } from '@util/constants';
import Head from '../head';
import Header from '../header';
import { SkipNavContent } from '@components/core/skip-nav';

export default function Layout({ children }) {
  const auth = useAuth();

  console.log(`auth`, auth);

  return (
    <>
      <Head meta={constants.meta} />

      <Header
        auth={auth}
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
