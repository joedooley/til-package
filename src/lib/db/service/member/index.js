import { db } from '@lib/firebase/firebase-admin';
import { membership } from '@lib/db/models/organization/membership';
import { member, updateMember } from '@lib/db/models/organization/member';

export const createMember = async (org, user) => {
  const uid = user.uid;
  const orgId = org.id;
  const batch = db.batch();

  try {
    const newMember = member(org, user);
    const newMemberRef = db.doc(`organizations/${orgId}/members/${uid}`);
    const newMembershipRef = db.doc(`users/${uid}/memberships/${orgId}`);

    return batch
      .create(newMemberRef, newMember)
      .create(newMembershipRef, membership(org, user))
      .commit()
      .then(() => newMember);
  } catch (error) {
    console.error(`createMember error`, JSON.stringify(error));

    throw error;
  }
};

export async function updateMembers(uid, batch, data) {
  return db
    .collectionGroup('members')
    .where('uid', '==', uid)
    .get()
    .then(async querySnapshot => {
      const updates = await updateMember(data);

      querySnapshot.forEach(documentSnapshot => {
        batch.update(db.doc(documentSnapshot.ref.path), updates);
      });
    });
}

export const deleteMember = async (orgId, uid) => {
  const batch = db.batch();
  const memberRef = db.doc(`organizations/${orgId}/members/${uid}`);
  const membershipRef = db.doc(`users/${uid}/memberships/${orgId}`);

  return batch.delete(memberRef).delete(membershipRef).commit();
};

export const deleteMembers = async (orgId, ids) => {
  const batch = db.batch();

  ids.forEach(uid => {
    const memberRef = db.doc(`organizations/${orgId}/members/${uid}`);
    const membershipRef = db.doc(`users/${uid}/memberships/${orgId}`);

    batch.delete(memberRef).delete(membershipRef);
  });

  return batch.commit();
};
