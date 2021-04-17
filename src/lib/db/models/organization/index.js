import * as yup from 'yup';
import { toSlug } from '@util/string';
import { validate } from '@util/object';

const schema = yup
  .object({
    name: yup.string(),
    slug: yup.string(),
    billingEmail: yup.string(),
    billingContact: yup.string(),
    photoURL: yup.string().default(''),
  })
  .noUnknown();

export const updateOrg = payload => {
  const updates = { ...payload };

  if (updates.name) {
    updates.slug = toSlug(updates.name);
  }

  return validate(schema, updates);
};

/**
 * Create organization.
 *
 * @param {object} data - Organization form payload.
 * @return {object} - Organization model.
 */
export const organization = (id, data, user) => {
  return {
    id,
    slug: toSlug(data.name),
    name: data.name,
    billingEmail: data.billingEmail,
    billingContact: data.billingContact,
    photoURL: data.photoURL ?? '',
    owner: user.uid,
  };
};
