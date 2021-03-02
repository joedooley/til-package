import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { UserProvider } from '@context/user';
import { propTypes } from '@util/constants';
import { user } from '@test/mocks/user';
import theme from '@styles/theme';

const AllTheProviders = ({ userState = user, children }) => {
  return (
    <UserProvider user={userState}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

AllTheProviders.propTypes = propTypes;
