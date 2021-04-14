import * as yup from 'yup';
import { admin } from '@lib/firebase/firebase-admin';
import { validate } from '@util/object';

const ROLES = {
  owner: 'owner',
  member: 'member',
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .noUnknown();

export const updateMembership = payload => {
  const fields = { name: payload.name };
  return validate(schema, fields).then(data => {
    return { ...data, last_updated: admin.firestore.Timestamp.fromDate(new Date()) };
  });
};

/**
 * Create organization membership.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 * @return {object} - Membership model.
 */
export const membership = (data, user) => {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    photoURL: data.photoURL,
    role: data.owner === user.uid ? ROLES.owner : ROLES.member,
    since: admin.firestore.Timestamp.fromDate(new Date()),
  };
};
