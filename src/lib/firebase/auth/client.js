import Router from 'next/router';
import firebase from '@lib/firebase/firebase';
import { client } from '@util/api-client';

const handleError = (label, error) => {
  console.error(`${label} error:`, JSON.stringify(error));
  return error;
};

const loginToServer = async userCredential => {
  const token = await userCredential.user.getIdToken();
  const user = userCredential.user;

  return client('/api/auth/login', { body: { token, user } }).then(response => response.data.user);
};

const signupWithEmail = async (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async response => {
      console.log(`response`, response);
      const token = await response.user.getIdToken();
      const user = response.user;

      return client('/api/auth/signup', { body: { token, user } })
        .then(response => {
          console.log(`signupWithEmail client response`, response);

          return response.data.user;
        })
        .catch(error => handleError('signup endpoint', error));
    })
    .catch(error => handleError('signupWithEmail', error));
};

const signInWithPhoneNumber = async (phone, redirect = '/dashboard/projects') => {
  const appVerifier = new firebase.auth.RecaptchaVerifier('login-button', { size: 'invisible' });
  const provider = new firebase.auth.PhoneAuthProvider();

  return provider
    .verifyPhoneNumber(phone, appVerifier)
    .then(verificationId => {
      const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');

      return firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    })
    .then(phoneCredential => {
      console.log(`phoneCredential`, phoneCredential);

      return firebase.auth().signInWithCredential(phoneCredential);
    })
    .then(async userCredential => {
      console.log(`userCredential`, userCredential);
      const token = await userCredential.user.getIdToken();
      const loginResponse = await login(token);

      console.log(`token`, token);
      console.log(`loginResponse`, loginResponse);

      if (loginResponse.data === 'ok') {
        return Router.push(redirect);
      }
    })
    .catch(error => {
      appVerifier.reset('login-button');
      handleError('signInWithPhoneNumber', JSON.stringify(error));
    });
};

const signInWithEmail = async (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(loginToServer)
};

const loginWithProvider = async type => {
  const provider = type === 'github' ? new firebase.auth.GithubAuthProvider() : new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

const signinWithProvider = async type => {
  return loginWithProvider(type).then(loginToServer);
};

const signout = () => {
  return client('/api/auth/logout', { method: 'POST' }).catch(error => {
    console.error(`signout error:`, JSON.stringify(error));
  });
};

export { signInWithPhoneNumber, signinWithProvider, signInWithEmail, signupWithEmail, signout };
