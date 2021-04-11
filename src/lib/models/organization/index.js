import { toSlug } from '@util/string';

/**
 * Create organization.
 *
 * @param {object} data - Organization form payload.
 * @return {object} - Organization model.
 */
export const organization = data => {
  return {
    id: toSlug(data.name),
    name: data.name,
    billingEmail: data.billingEmail,
    billingContact: data.billingContact,
    photoURL: data.photoURL ?? '',
    owner: {},

    get ownerInfo() {
      return this.owner.name;
    },

    set ownerInfo(user) {
      this.owner.uid = user.uid;
      this.owner.name = user.displayName;
    },
  };
};

class Organization {
  constructor(data, user) {
    this.id = toSlug(data.name);
    this.name = data.name;
    this.owner = user.uid;
    this.billingEmail = data.billingEmail;
    this.billingContact = data.billingContact;
    this.photoURL = data.photoURL ?? '';
  }

  toString() {
    return `${this.id}, ${this.name}, ${this.owner}, ${this.billingEmail}, ${this.billingContact}, ${this.photoURL}`;
  }
}

export const makeConverter = user => {
  return {
    toFirestore: function (organization) {
      return {
        id: organization.id,
        name: organization.name,
        owner: user.uid,
        billingEmail: organization.billingEmail,
        billingContact: organization.billingContact,
        photoURL: organization.photoURL,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);

      return new Organization(data, user);
    },
  };
};
