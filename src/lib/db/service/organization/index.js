import { db } from '@lib/firebase/firebase-admin';
import { getTimestamps } from '@util/object';
import { organization, updateOrg } from '@lib/db/models/organization';
import { membership, updateMembership } from '@lib/db/models/organization/membership';
import { member } from '@lib/db/models/organization/member';

export async function getOrganization(id) {
  const { docs } = await db.collection('organizations').where('slug', '==', id).get();

  const orgs = docs.map(doc => {
    const data = doc.data();

    return {
      data: {
        id: doc.id,
        ...data,
        ...getTimestamps(doc, true),
      },
    };
  });

  return orgs[0];
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

    const newMemberRef = db.doc(`organizations/${newOrgId}/members/${uid}`);
    const newMembershipRef = db.doc(`users/${uid}/memberships/${newOrgId}`);

    return batch
      .create(newOrgRef, org)
      .create(newMemberRef, member(org, user))
      .create(newMembershipRef, membership(org, user))
      .commit()
      .then(() => org);
  } catch (error) {
    console.error(`createOrganization error`, JSON.stringify(error));

    throw error;
  }
};

export const updateOrganization = async (uid, id, payload) => {
  const updatedOrg = await updateOrg(payload);
  const updatedMembership = await updateMembership(updatedOrg);

  const batch = db.batch();
  const orgRef = db.doc(`organizations/${id}`);
  const membershipRef = db.doc(`users/${uid}/memberships/${id}`);

  return batch
    .update(orgRef, updatedOrg)
    .update(membershipRef, updatedMembership)
    .commit()
    .then(async () => {
      const orgDoc = await orgRef.get();

      return orgDoc.data();
    });
};

export const deleteOrganization = async (uid, id) => {
  const batch = db.batch();

  const orgRef = db.doc(`organizations/${id}`);
  const memberRef = db.doc(`organizations/${id}/members/${uid}`);
  const membershipRef = db.doc(`users/${uid}/memberships/${id}`);

  return batch.delete(orgRef).delete(memberRef).delete(membershipRef).commit();
};

export async function getOrgMembers(id) {
  const { docs } = await db.collection(`organizations/${id}/members`).get();

  const entries = docs.map(doc => {
    const member = doc.data();

    return {
      uid: member.uid,
      name: member.displayName,
      role: member.role,
      ...getTimestamps(doc, true),
    };
  });

  return { entries };
}
