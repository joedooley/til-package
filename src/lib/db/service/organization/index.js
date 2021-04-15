import { db } from '@lib/firebase/firebase-admin';
import { getTimestamps } from '@util/object';
import { organization, updateOrg } from '@lib/db/models/organization';
import { membership, updateMembership } from '@lib/db/models/organization/membership';
import { member } from '@lib/db/models/organization/member';

export async function getOrganization(id) {
  const entries = [];

  try {
    const querySnapshot = await db.collection('organizations').where('slug', '==', id).get();

    querySnapshot.forEach(doc => {
      entries.push({ id: doc.id, ...getTimestamps(doc, true), ...doc.data() });
    });

    return {
      data: {
        ...entries[0],
      },
    };
  } catch (error) {
    console.error('Transaction failure:', JSON.stringify(error));
    throw error;
  }
}

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

    return batch.commit().then(() => org);
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

  return batch.commit();
};

export async function getOrgMembers(id) {
  const membersRef = db.collection(`organizations/${id}/members`);

  try {
    const snapshot = await membersRef.get();
    const entries = [];

    snapshot.forEach(doc => {
      const member = doc.data();

      entries.push({
        name: member.displayName,
        role: member.role,
        since: member.since.toDate(),
        ...getTimestamps(doc, true),
      });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}
