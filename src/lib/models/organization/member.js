import * as yup from 'yup';
import { admin } from '@lib/firebase/firebase-admin';
import { validate } from '@util/object';

const ROLES = {
  owner: 'owner',
  member: 'member',
};

const schema = yup
  .object({
    displayName: yup.string(),
    role: yup.bool(),
  })
  .noUnknown();

export const updateMember = payload => {
  const fields = { name: payload.name };
  return validate(schema, fields).then(data => {
    return { ...data, last_updated: admin.firestore.Timestamp.fromDate(new Date()) };
  });
};

/**
 * Create member.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 * @return {object} - Member model.
 */
export const member = (data, user) => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    role: data.owner === user.uid ? ROLES.owner : ROLES.member,
    since: admin.firestore.Timestamp.fromDate(new Date()),
  };
};
