import firebase from '@lib/firebase/firebase';
import { client } from '@util/api-client';
import { normalizePhone } from '@util/string';

const login = async userCredential => {
  const token = await userCredential.user.getIdToken();
  const user = userCredential.user;

  return client('/api/auth/login', { body: { token, user } }).then(response => response.data.user);
};

const verifyPhoneNumber = async phone => {
  const appVerifier = new firebase.auth.RecaptchaVerifier('login-button', { size: 'invisible' });
  const phoneNumber = normalizePhone(phone);

  return firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(response => response.verificationId);
};

const signInWithVerificationCode = (id, code) => {
  const phoneCredential = firebase.auth.PhoneAuthProvider.credential(id, code);

  return firebase.auth().signInWithCredential(phoneCredential).then(login);
};

const loginWithProvider = async type => {
  const provider = type === 'github' ? new firebase.auth.GithubAuthProvider() : new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

const signinWithProvider = async type => {
  return loginWithProvider(type).then(login);
};

const signout = () => {
  return client('/api/auth/logout', { method: 'POST' }).catch(error => {
    console.error(`signout error:`, JSON.stringify(error));
  });
};

export { signinWithProvider, signout, verifyPhoneNumber, signInWithVerificationCode };
