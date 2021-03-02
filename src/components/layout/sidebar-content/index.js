import PropTypes from 'prop-types';
import Head from 'next/head';
import { app as constants } from '@util/constants';
import usePageTitle from '@hooks/usePageTitle';
import Header from '../header/component';
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
        css={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <Sidebar />
        <article
          css={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignContent: 'flex-start',
          }}
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
