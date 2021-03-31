import * as React from 'react';
import PropTypes from 'prop-types';
import { ToastProvider as ReactToastProvider } from 'react-toast-notifications';

export default function ToastProvider({ children }) {
  return (
    <ReactToastProvider placement="bottom-right" autoDismiss={true}>
      {children}
    </ReactToastProvider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
