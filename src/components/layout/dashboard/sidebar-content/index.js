import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { css } from '@emotion/react';
import { useAuth } from '@lib/firebase/auth';
import { app as constants } from '@util/constants';
import { SkipNavContent } from '@components/core/skip-nav';
import usePageTitle from '@hooks/usePageTitle';
import Sidebar from '../sidebar';

export default function DashboardLayout({ children, pageTitle }) {
  const title = usePageTitle(pageTitle);
  const auth = useAuth();

  console.log(`auth`, auth);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={constants.meta.description} />
      </Head>

      <main
        css={css`
          display: flex;
          min-height: 100vh;
        `}
      >
        <Sidebar siteTitle={constants.site.title} />

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

DashboardLayout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
};
