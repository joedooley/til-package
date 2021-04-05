import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useUser } from '@hooks/useUser';
import { signinWithProvider, signout, verifyPhoneNumber, signInWithVerificationCode } from '@lib/firebase/auth/client';

const AuthContext = React.createContext();

function useProvideAuth() {
  const router = useRouter();
  const { addToast } = useToasts();
  const { mutateUser } = useUser();

  const toastId = React.useRef(null);

  const login = React.useCallback(
    provider => {
      return signinWithProvider(provider)
        .then(response => {
          mutateUser(response);
          addToast('Login Successful', { appearance: 'success' });
          router.push('/dashboard/account');
        })
        .catch(error => {
          console.error('signinWithProvider error', error);
          if (error.code !== toastId.current) {
            toastId.current = addToast(error.message, { id: error.code, appearance: 'error', autoDismiss: false });
          }
        });
    },
    [mutateUser, addToast, router]
  );

  const loginWithPhone = React.useCallback(
    phone => {
      return verifyPhoneNumber(phone)
        .then(response => {
          addToast('Success! A text message has been sent to your device.', { appearance: 'success' });

          return response;
        })
        .catch(error => {
          console.error('loginWithPhone error', error);
          if (error.code !== toastId.current) {
            toastId.current = addToast(error.message, { id: error.code, appearance: 'error', autoDismiss: false });
          }
        });
    },
    [addToast]
  );

  const loginWithPhoneCode = React.useCallback(
    (id, code) => {
      return signInWithVerificationCode(id, code)
        .then(response => {
          mutateUser(response);
          addToast('Login Successful', { appearance: 'success' });
          router.push('/dashboard/account');
        })
        .catch(error => {
          console.error('loginWithPhoneCode error', error);
          if (error.code !== toastId.current) {
            toastId.current = addToast(error.message, { id: error.code, appearance: 'error', autoDismiss: false });
          }
        });
    },
    [mutateUser, addToast, router]
  );

  const logout = React.useCallback(
    e => {
      e.preventDefault();
      mutateUser(null);

      return signout()
        .then(() => {
          addToast('Logout Successful', { appearance: 'success' });
          router.push('/');
        })
        .catch(() => {
          router.push('/');
        });
    },
    [mutateUser, addToast, router]
  );

  return { login, logout, loginWithPhone, loginWithPhoneCode };
}

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  const value = React.useMemo(() => auth, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
