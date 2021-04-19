import { emailToUsername, phoneToUsername, createSearchKeywords } from '@util/string';

/**
 * Create username from email or phone.
 *
 * @param {object} user - Firebase Auth UserRecord.
 * @return {object} - Username.
 */
const createUsername = user => {
  return user.email ? emailToUsername(user.email) : phoneToUsername(user.phoneNumber);
};

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
  const username = createUsername(user);
  const providers = normalizeProviders(user.providerData);

  return {
    uid: user.uid,
    email: user.email ?? '',
    username,
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
    searchKeywords: createSearchKeywords(username),
  };
};
