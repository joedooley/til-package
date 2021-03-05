import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from '@lib/firebase/auth';
import theme from '@styles/theme';
import GlobalCss from '@styles/global';
import Layout from '@components/layout/sidebar-content';

export default function App({ Component, pageProps }) {
  console.log(`useRouter()`, useRouter());

  return (
    <ThemeProvider theme={theme}>
      <GlobalCss theme={theme} />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
