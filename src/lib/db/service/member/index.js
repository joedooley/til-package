import { db } from '@lib/firebase/firebase-admin';
import { organization } from '@lib/db/models/organization';
import { membership } from '@lib/db/models/organization/membership';
import { member, updateMember } from '@lib/db/models/organization/member';

export const createMember = async (data, uid) => {
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

    return batch.commit().then(() => org);
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
