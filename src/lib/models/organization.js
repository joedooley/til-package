import { toSlug } from '@util/string';

/**
 * Create organization.
 *
 * @param {object} data - Organization form payload.
 * @param {object} user - User.
 * @return {object} - Organization model.
 */
export const organization = (data, user) => {
  const members = [];
  const member = {
    uid: user.uid,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
  };

  members.push(member);

  return {
    id: toSlug(data.name),
    name: data.name,
    owner: user.uid,
    billingEmail: data.billingEmail,
    billingContact: data.billingContact,
    photoURL: data.photoURL ?? '',
    members,
  };
};

/**
 * Create organization.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 * @return {object} - Organization model.
 */
export const membership = (data, user) => {
  const memberships = [];
  const membership = {
    id: data.id,
    name: data.name,
    photoURL: data.photoURL,
    isOwner: data.owner === user.uid,
  };

  memberships.push(membership);

  return {
    id: toSlug(data.name),
    name: data.name,
    owner: user.uid,
    billingEmail: data.billingEmail,
    billingContact: data.billingContact,
    photoURL: data.photoURL ?? '',
    memberships,
  };
};
