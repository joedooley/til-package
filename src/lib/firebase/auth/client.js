import Router from 'next/router';
import firebase from '@lib/firebase/firebase';
import { client } from '@util/api-client';

const handleError = (label, error) => {
  console.error(`${label} error:`, JSON.stringify(error));
  return error;
};

function login(token) {
  return client('/api/auth/login', { body: { token } });
}

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

const signinWithProvider = type => {
  const provider = type === 'github' ? new firebase.auth.GithubAuthProvider() : new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(response =>
      response.user
        .getIdToken()
        .then(token =>
          login(token)
            .then(response => response.data.user)
            .catch(error => handleError('login', error))
        )
        .catch(error => handleError('getIdToken', error))
    )
    .catch(error => handleError('signInWithPopup', error));
};

const signout = () => {
  return client('/api/auth/logout', { method: 'POST' }).catch(error => {
    console.error(`signout error:`, JSON.stringify(error));
  });
};

export { signInWithPhoneNumber, signinWithProvider, signout };
