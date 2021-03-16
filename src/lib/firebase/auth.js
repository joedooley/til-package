import * as React from 'react';
import PropTypes from 'prop-types';
import firebase from './firebase';
import Router from 'next/router';
import { createUser } from './db';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleUser = React.useCallback(rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
      setLoading(false);

      return user;
    } else {
      setUser(false);
      setLoading(false);

      return false;
    }
  }, []);

  const signinWithGitHub = (redirect = '/dashboard') => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        handleUser(response.user);
        Router.push(redirect);
      });
  };

  const signinWithGoogle = (redirect = '/dashboard') => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        handleUser(response.user);
        Router.push(redirect);
      })
      .catch(error => console.error(error));
  };

  // eslint-disable-next-line no-unused-vars
  const signinWithEmail = (email, password, redirect = '/dashboard') => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        handleUser(response.user);
        Router.push(redirect);
      });
  };

  const signout = (redirect = '/') => {
    Router.push(redirect);

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
      .catch(error => console.error(error));
  };

  // eslint-disable-next-line no-unused-vars
  const linkProviderAccount = provider => {
    return firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .catch(error => console.error(error));
  };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
