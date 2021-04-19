import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { db } from '@lib/firebase/firebase-admin';
import { getTimestamps } from '@util/object';
import { createSearchKeywords } from '@util/string';
import { updateMembers } from '../member';

export async function getUser(uid) {
  const userRef = db.doc(`users/${uid}`);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  return {
    user: {
      ...userDoc.data(),
      ...getTimestamps(userDoc),
    },
  };
}

export const createUser = async user => {
  await db.collection('users').doc(user.uid).set(user);

  return getUser(user.uid);
};

export const updateUsername = async (uid, batch, data) => {
  const { username } = data;
  const userRef = db.doc(`users/${uid}`);
  const charCount = username.length;

  if (charCount < 2) {
    return Promise.reject(new Error(`Please use 2 characters at minimum.`));
  }

  if (charCount >= 48) {
    return Promise.reject(new Error(`Please use 48 characters at maximum.`));
  }

  if (!isLowercase(username)) {
    return Promise.reject(new Error(`Usernames must be lowercased.`));
  }

  if (!isAlphanumeric(username)) {
    return Promise.reject(new Error(`Usernames can only have alphanumeric characters.`));
  }

  return db
    .collection('users')
    .where('username', '==', username)
    .get()
    .then(query => {
      if (!query.empty) {
        return Promise.reject(new Error(`${username} is already in use`));
      }

      batch.update(userRef, { username, searchKeywords: createSearchKeywords(username) });
    });
};

export const updateEmail = async (uid, batch, data) => {
  const { email } = data;
  const userRef = db.doc(`users/${uid}`);

  if (!isEmail(email)) {
    return Promise.reject(new Error(`Invalid email address.`));
  }

  return db
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(query => {
      if (!query.empty) {
        return Promise.reject(new Error(`${email} is already in use`));
      }

      batch.update(userRef, { email });
    });
};

export const updateUser = async (uid, data) => {
  const userRef = db.doc(`users/${uid}`);

  const batch = db.batch();

  if (data.email) {
    await updateEmail(uid, batch, data);
  }

  if (data.username) {
    await updateUsername(uid, batch, data);
  }

  if (data.displayName) {
    await updateMembers(uid, batch, data);
    batch.update(userRef, { displayName: data.displayName });
  }

  return batch.commit();
};

export const deleteUser = async uid => {
  return await db.collection('users').doc(uid).delete();
};

export async function getUserCollection(uid, name) {
  const userRef = db.doc(`users/${uid}`);

  try {
    const snapshot = await userRef.collection(name).get();
    const entries = [];

    snapshot.forEach(doc => {
      entries.push({ id: doc.id, ...getTimestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}

export async function searchUsers(query) {
  const { docs } = await db
    .collection('users')
    .where('searchKeywords', 'array-contains', query.trim().toLowerCase())
    .get();

  return docs.map(doc => {
    const data = doc.data();

    return {
      uid: data.uid,
      displayName: data.displayName,
      username: data.username,
      email: data.email,
    };
  });
}
