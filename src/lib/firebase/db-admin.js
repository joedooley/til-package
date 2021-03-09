import db from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get();
    const feedback = [];
    snapshot.forEach(doc => {
      feedback.push({ id: doc.id, ...doc.data() });
    });
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllUsers() {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];

    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return { users };
  } catch (error) {
    return { error };
  }
}
