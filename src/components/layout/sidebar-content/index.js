import PropTypes from 'prop-types';
import Head from 'next/head';
import { css } from '@emotion/react';
import { app as constants } from '@util/constants';
import usePageTitle from '@hooks/usePageTitle';
import Header from '../header';
import Sidebar from '../sidebar';
import { SkipNavContent } from '@components/core/skip-nav';

export default function Layout({ children, pageTitle }) {
  const title = usePageTitle(pageTitle);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={constants.meta.description} />
      </Head>
      <Header />

      <main
        css={css`
          display: flex;
          min-height: 100vh;
        `}
      >
        <Sidebar />

        <article
          css={theme => css`
            align-content: flex-start;
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
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};
