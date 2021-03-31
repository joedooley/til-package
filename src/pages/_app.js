import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from '@hooks/useAuth';
import theme from '@styles/theme';
import GlobalCss from '@styles/global';
import ToastProvider from '@components/core/toast';
import SiteLayout from '@components/layout/sidebar-content';
import DashboardLayout from '@components/layout/dashboard/sidebar-content';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isDashboard = router.pathname.includes('dashboard');
  const Layout = isDashboard ? DashboardLayout : SiteLayout;

  return (
    <ThemeProvider theme={theme}>
      <GlobalCss theme={theme} />
      <ToastProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
