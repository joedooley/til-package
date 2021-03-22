import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatchUser } from '@components/auth/user';
import { signinWithProvider, signout } from '@lib/firebase/auth/client';
import firebase from '@lib/firebase/firebase';

const AuthContext = React.createContext();

function useProvideAuth() {
  const router = useRouter();
  const dispatch = useDispatchUser();

  const login = React.useCallback(
    provider => {
      dispatch({ type: 'FETCH_START' });

      return signinWithProvider(provider)
        .then(response => {
          dispatch({ type: 'SET_USER', payload: response });
          router.push('/dashboard/account');
        })
        .catch(error => {
          console.error('signinWithProvider error', error);
          dispatch({ type: 'SET_ERROR', payload: error });
        });
    },
    [dispatch, router]
  );

  const logout = React.useCallback(
    e => {
      e.preventDefault();
      dispatch({ type: 'FETCH_START' });

      return signout()
        .then(() => {
          dispatch({ type: 'SET_USER', payload: null });
          router.push('/');
        })
        .catch(() => {
          dispatch({ type: 'SET_USER', payload: null });
          router.push('/');
        });
    },
    [dispatch, router]
  );

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  return { login, logout, signup };
}

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
