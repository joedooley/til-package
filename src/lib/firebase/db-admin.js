import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { db } from '@lib/firebase/firebase-admin';
import { organization, updateOrg } from '@lib/models/organization';
import { membership, updateMembership } from '@lib/models/organization/membership';
import { member, updateMember } from '@lib/models/organization/member';

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
    .where('email', '==', email)
    .get()
    .then(query => {
      if (!query.empty) {
        return Promise.reject(new Error(`${email} is already in use`));
      }

      return db.collection('users').doc(uid).update(data);
    });
};

export const updateUser = async (uid, data) => {
  if (data.displayName) {
    const members = [];
    const querySnapshot = await db.collectionGroup('members').where('uid', '==', uid).get();

    console.log(`querySnapshot`, querySnapshot);

    querySnapshot.forEach(doc => {
      console.log(`doc`, doc);
      console.log(doc.id, ' => ', doc.data());
      members.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    console.log(`members`, members);

    return members;
  }

  if (data.username) {
    return updateUsername(uid, data);
  }

  if (data.email) {
    return updateEmail(uid, data);
  }

  // const updates = {
  //   user: await updateOrg(data),
  //   member: await updateMember(data),
  // };

  // const batch = db.batch();
  // const orgRef = db.doc(`organizations/${id}`);
  // const membershipRef = db.doc(`users/${uid}/memberships/${id}`);

  // batch.update(orgRef, updates.org).update(membershipRef, updates.membership);

  console.log(`updateUser data:`, data);

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
  const entries = [];

  try {
    const querySnapshot = await db.collection('organizations').where('slug', '==', id).get();

    querySnapshot.forEach(doc => {
      entries.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return {
      data: {
        ...entries[0],
      },
    };
  } catch (error) {
    console.log('Transaction failure:', JSON.stringify(error));

    throw error;
  }
}

// export async function getOrganization(id) {
//   const ref = db.doc(`organizations/${id}`);
//   const doc = await ref.get();

//   if (!doc.exists) {
//     throw new Error('Organization not found');
//   }

//   return {
//     data: {
//       ...doc.data(),
//       ...timestamps(doc),
//     },
//   };
// }

export const createOrganization = async (data, uid) => {
  const userRef = db.doc(`users/${uid}`);

  try {
    const userDoc = await userRef.get();
    const user = userDoc.data();

    const batch = db.batch();

    const newOrgRef = db.collection('organizations').doc();
    const newOrgId = newOrgRef.id;
    const org = organization(newOrgId, data, user);

    batch.create(newOrgRef, org);

    const newMemberRef = db.doc(`organizations/${newOrgId}/members/${uid}`);
    batch.create(newMemberRef, member(org, user));

    const newMembershipRef = db.doc(`users/${uid}/memberships/${newOrgId}`);
    batch.create(newMembershipRef, membership(org, user));

    return batch.commit().then(() => {
      console.log('Successfully executed batch.');

      return org;
    });
  } catch (error) {
    console.error(`createOrganization error`, JSON.stringify(error));

    throw error;
  }
};

export const updateOrganization = async (uid, id, payload) => {
  const updates = {
    org: await updateOrg(payload),
    membership: await updateMembership(payload),
  };

  const batch = db.batch();
  const orgRef = db.doc(`organizations/${id}`);
  const membershipRef = db.doc(`users/${uid}/memberships/${id}`);

  batch.update(orgRef, updates.org).update(membershipRef, updates.membership);

  return batch.commit();
};

export const deleteOrganization = async (uid, id) => {
  const batch = db.batch();

  const orgRef = db.doc(`organizations/${id}`);
  const memberRef = db.doc(`organizations/${id}/members/${uid}`);
  const membershipRef = db.doc(`users/${uid}/memberships/${id}`);

  batch.delete(orgRef).delete(memberRef).delete(membershipRef);

  return await batch.commit();
};

export async function updateMemberDocs(uid, data) {
  const entries = [];
  const batch = db.batch();

  try {
    const querySnapshot = await db.collectionGroup('members').where('uid', '==', uid).get();

    querySnapshot.forEach(doc => {
      batch.update(doc, updateMember(data));
      entries.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}

export async function getOrgMembers(id) {
  const membersRef = db.collection(`organizations/${id}/members`);

  try {
    const snapshot = await membersRef.get();
    const entries = [];

    snapshot.forEach(doc => {
      const member = doc.data();

      entries.push({ name: member.displayName, role: member.role, since: member.since.toDate() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}
