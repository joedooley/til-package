import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { db, FieldValue } from '@lib/firebase/firebase-admin';
import { organization } from '@lib/models/organization';

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

export const deleteUser = async uid => {
  return await db.collection('users').doc(uid).delete();
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

export async function getUserDocs(name) {
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

export async function getOrganization(id) {
  const ref = db.doc(`organizations/${id}`);
  const doc = await ref.get();

  if (!doc.exists) {
    throw new Error('Organization not found');
  }

  return {
    data: {
      ...doc.data(),
      ...timestamps(doc),
    },
  };
}

export const createOrganization = async (data, user) => {
  const org = organization(data, user);
  const newOrgRef = db.doc(`organizations/${org.id}`);
  const userRef = db.doc(`users/${user.uid}`);

  console.log(`org`, org);

  try {
    const newOrg = await db.runTransaction(async transaction => {
      const newOrgDoc = await transaction.get(newOrgRef);
      const userDoc = await transaction.get(userRef);

      if (newOrgDoc.exists) {
        return Promise.reject(new Error(`${org.name} is already in use`));
      }

      await transaction.create(newOrgDoc, org);
      await transaction.update(userDoc, { memberships: {} });

      return transaction.get(newOrgDoc).then(doc => {
        transaction.create(newOrgDoc, org);

        console.log(`doc`, doc);
        console.log(`doc.data()`, doc.data());

        return Promise.resolve(org);
      });
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }
};
