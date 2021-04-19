import * as yup from 'yup';
import { validate } from '@util/object';

export const ROLES = {
  owner: 'owner',
  member: 'member',
  admin: 'admin',
  developer: 'developer',
};

export const updateMember = payload => {
  const schema = yup.object({ displayName: yup.string(), role: yup.bool() }).noUnknown();

  return validate(schema, payload);
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
  };
};
