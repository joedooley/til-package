import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { db } from '@lib/firebase/firebase-admin';
import { organization, makeConverter } from '@lib/models/organization';
import { member } from '@lib/models/organization/member';
import { membership } from '@lib/models/organization/membership';

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

export async function getUserCollection(uid, name) {
  const userRef = db.doc(`users/${uid}`);

  try {
    const snapshot = await userRef.collection(name).get();
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

export async function getOrganizations(name, uid) {
  const user = await getUser(uid);
  const orgConverter = makeConverter(user);

  try {
    const snapshot = await db.collection(name).withConverter(orgConverter).get();
    const entries = [];

    snapshot.forEach(doc => {
      entries.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}

export const createOrganization = async (data, uid) => {
  const org = organization(data);
  const userRef = db.doc(`users/${uid}`);
  const newOrgRef = db.doc(`organizations/${org.id}`);
  const newMemberRef = newOrgRef.collection('members').doc(uid);
  const newMembershipRef = userRef.collection('memberships').doc(org.id);

  try {
    const newOrg = await db.runTransaction(async transaction => {
      const userDoc = await transaction.get(userRef);
      const newOrgDoc = await transaction.get(newOrgRef);

      if (newOrgDoc.exists) {
        return Promise.reject(new Error(`${org.name} is already in use`));
      }

      const user = userDoc.data();

      org.ownerInfo = user;
      const newMember = member(org, user);
      const newMembership = membership(org, user);

      await transaction.create(newOrgRef, org);
      await transaction.create(newMemberRef, newMember);
      await transaction.create(newMembershipRef, newMembership);

      return org;
    });

    console.log(`Transaction value`, newOrg);
    console.log('Transaction success!');

    return newOrg;
  } catch (e) {
    console.log('Transaction failure:', e);

    throw e;
  }
};

export const deleteOrganization = async (uid, id) => {
  const batch = db.batch();

  const userRef = db.doc(`users/${uid}`);
  const orgRef = db.doc(`organizations/${id}`);
  const newMemberRef = orgRef.collection('members').doc(uid);
  const newMembershipRef = userRef.collection('memberships').doc(id);

  batch.delete(orgRef).delete(newMemberRef).delete(newMembershipRef);

  return await batch.commit();
};
