import * as yup from 'yup';
import { admin } from '@lib/firebase/firebase-admin';
import { toSlug } from '@util/string';
import { validate } from '@util/object';

let schema = yup
  .object({
    name: yup.string().required(),
    billingEmail: yup.string(),
    billingContact: yup.string(),
    photoURL: yup.string().default(''),
  })
  .noUnknown();

export const updateOrg = payload =>
  validate(schema, payload).then(data => {
    return { ...data, last_updated: admin.firestore.Timestamp.now() };
  });

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
