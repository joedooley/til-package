import { admin } from '@lib/firebase/firebase-admin';

const ROLES = {
  owner: 'owner',
  member: 'member',
};

/**
 * Create organization membership.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 * @return {object} - Organization model.
 */
export const membership = (data, user) => {
  return {
    id: data.id,
    name: data.name,
    photoURL: data.photoURL,
    role: data.owner.uid === user.uid ? ROLES.owner : ROLES.member,
    since: admin.firestore.Timestamp.now(),
  };
};

/**
 * Membership class representing a user that belongs to an Organization.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 *
 * @export
 * @class Membership
 */
export class Membership {
  constructor(data, user) {
    this.id = data.id;
    this.name = data.name;
    this.photoURL = data.photoURL;
    this.role = data.owner === user.uid ? ROLES.owner : ROLES.member;
  }

  toString() {
    return `${this.id}, ${this.name}, ${this.photoURL}, ${this.role}`;
  }
}

export const converter = user => {
  return {
    toFirestore: function (membership) {
      return {
        id: membership.id,
        name: membership.name,
        role: membership.role,
        photoURL: membership.photoURL,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);

      return new Membership(data, user);
    },
  };
};
