import * as React from 'react';
import PropTypes from 'prop-types';
import firebase from './firebase';
import Router from 'next/router';
import { createUser } from './db';

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setLoading(false);
      setUser(user);

      return user;
    } else {
      setLoading(false);
      setUser(false);

      return false;
    }
  };

  const signinWithGitHub = redirect => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signinWithGoogle = redirect => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch(error => console.error(error));
  };

  // eslint-disable-next-line no-unused-vars
  const linkProviderAccount = provider => {
    return firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .catch(error => console.error(error));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
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

const formatUser = user => {
  console.log(`user`, user);

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
