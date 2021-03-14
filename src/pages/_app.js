import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from '@lib/firebase/auth';
import theme from '@styles/theme';
import GlobalCss from '@styles/global';
import SiteLayout from '@components/layout/sidebar-content';
import DashboardLayout from '@components/layout/dashboard/sidebar-content';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const Layout = router.pathname.includes('dashboard') ? DashboardLayout : SiteLayout;

  console.log(`router`, router);

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

/**
 * Measuring performance
 * @link https://nextjs.org/docs/advanced-features/measuring-performance
 * @param {*} metric
 */
// export function reportWebVitals(metric) {
//   console.log(metric);
// }

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
