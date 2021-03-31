import { db, FieldValue } from '@lib/firebase/firebase-admin';
import isEmail from 'validator/lib/isEmail';

const timestamps = doc => ({
  created: doc.createTime.seconds,
  updated: doc.updateTime.seconds,
});

export async function getUser(uid) {
  const userRef = db.doc(`users/${uid}`);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  return {
    user: {
      ...userDoc.data(),
      ...timestamps(userDoc),
    },
  };
}

export const createUser = async user => {
  await db.collection('users').doc(user.uid).set(user);

  return getUser(user.uid);
};

export const updateUsername = async (uid, data) => {
  const { username } = data;
  const charCount = username.length;

  if (charCount < 2) {
    return Promise.reject(new Error(`Please use 2 characters at minimum.`));
  }

  if (charCount >= 48) {
    return Promise.reject(new Error(`Please use 48 characters at maximum.`));
  }

  return db
    .collection('users')
    .where('username', '==', username)
    .get()
    .then(query => {
      if (!query.empty) {
        return Promise.reject(new Error(`${username} is already in use`));
      }

      return db.collection('users').doc(uid).update(data);
    });
};

export const updateEmail = async (uid, data) => {
  const { email } = data;

  if (!isEmail(email)) {
    return Promise.reject(new Error(`Invalid email address.`));
  }

  return db
    .collection('users')
    .where('username', '==', email)
    .get()
    .then(query => {
      if (!query.empty) {
        return Promise.reject(new Error(`${email} is already in use`));
      }

      return db.collection('users').doc(uid).update(data);
    });
};

export const updateUser = async (uid, data) => {
  if (data.username) {
    return updateUsername(uid, data);
  }

  if (data.email) {
    return updateEmail(uid, data);
  }

  return db.collection('users').doc(uid).update(data);
};

export async function getCollection(name) {
  try {
    const snapshot = await db.collection(name).get();
    const entries = [];

    snapshot.forEach(doc => {
      entries.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}
