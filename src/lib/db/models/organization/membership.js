import * as yup from 'yup';
import { validate } from '@util/object';

const ROLES = {
  owner: 'owner',
  member: 'member',
};

export const updateMembership = payload => {
  const updates = {};

  if (payload.name) {
    updates.name = payload.name;
    updates.slug = payload.slug;
  }

  if (payload.photoURL) {
    updates.photoURL = payload.photoURL;
  }

  const schema = yup.object({ name: yup.string(), slug: yup.string(), photoURL: yup.string() }).noUnknown();

  return validate(schema, updates);
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
  };
};
