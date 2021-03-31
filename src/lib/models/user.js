import { emailToUsername } from '@util/string';

/**
 * Normalize Firebase Provider for database.
 *
 * @link https://firebase.google.com/docs/reference/node/firebase.User#providerdata
 * @param {object} user - Firebase Auth providerData.
 * @return {object} - User model.
 */
const normalizeProviders = providers =>
  providers.map(x => ({
    displayName: x.displayName ?? '',
    email: x.displayName ?? '',
    phoneNumber: x.phoneNumber ?? '',
    photoURL: x.photoURL ?? '',
    providerId: x.providerId,
    uid: x.uid,
  }));

/**
 * Normalize Firebase User for database.
 *
 * @link https://firebase.google.com/docs/reference/node/firebase.User
 * @param {object} user - Firebase Auth User.
 * @return {object} - User model.
 */
export const normalizeUser = user => {
  const providers = normalizeProviders(user.providerData);

  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    username: emailToUsername(user.email),
    displayName: user.displayName ?? '',
    phoneNumber: user.phoneNumber ?? '',
    photoURL: user.photoURL ?? '',
    providerData: providers,
    signInMethod: providers[0].providerId,
    isAnonymous: user.isAnonymous,
    tenantId: user.tenantId,
    multiFactor: user.multiFactor,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
};
