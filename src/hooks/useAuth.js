import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { useUser } from '@hooks/useUser';
import { signinWithProvider, signInWithEmail, signupWithEmail, signout } from '@lib/firebase/auth/client';

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
          console.log(`useAuth login response`, response);

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

  const loginWithEmail = React.useCallback(
    (email, password) => {
      return signInWithEmail(email, password)
        .then(response => {
          console.log(`response`, response);
          mutateUser(response);
          addToast('Login Successful', { appearance: 'success' });
          router.push('/dashboard/account');
        })
        .catch(error => {
          mutateUser(null);
          console.error('loginWithEmail error', error);
          if (error.code !== toastId.current) {
            toastId.current = addToast(error.message, { id: error.code, appearance: 'error', autoDismiss: false });
          }
        });
    },
    [addToast, mutateUser, router]
  );

  const signup = React.useCallback(
    (email, password) => {
      return signupWithEmail(email, password)
        .then(response => {
          mutateUser(response);
          addToast('Login Successful', { appearance: 'success' });
          router.push('/dashboard/account');
        })
        .catch(error => {
          mutateUser(null);
          console.error('signupWithEmail error', error);
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

  return { login, loginWithEmail, logout, signup };
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
