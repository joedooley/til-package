import Router from 'next/router';
import { getFirebase } from '@lib/firebase/firebase';
import { client } from '@util/api-client';

const firebase = getFirebase();

async function postUserToken(token) {
  var data = { token };
  var url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`;

  return client(url, { body: data });
}

const signinWithProvider = (type, redirect = '/dashboard/projects') => {
  const provider = type === 'github' ? new firebase.auth.GithubAuthProvider() : new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(response =>
      response.user
        .getIdToken()
        .then(token =>
          postUserToken(token)
            .then(response => {
              if (response.data === 'ok') {
                return Router.push(redirect);
              }

              Router.reload();
            })
            .catch(error => console.error(`postUserToken error:`, JSON.stringify(error)))
        )
        .catch(error => console.error(`getIdToken error:`, JSON.stringify(error)))
    )
    .catch(error => {
      console.log(`signInWithPopup error:`, JSON.stringify(error));
    });
};

const signout = () => {
  var url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/logout`;

  return client(url, { body: {} }).catch(error => {
    console.log(`signout error:`, JSON.stringify(error));
    Router.push('/');
  });
};

export { signinWithProvider, signout };
