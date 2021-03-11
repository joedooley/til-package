import firebase from './firebase';

const firestore = firebase.firestore();

export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createPost(data) {
  return firestore.collection('post').add(data);
}
