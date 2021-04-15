import { db } from '@lib/firebase/firebase-admin';
import { getTimestamps } from '@util/object';

export async function getCollection(name) {
  try {
    const snapshot = await db.collection(name).get();
    const entries = [];

    snapshot.forEach(doc => {
      entries.push({ id: doc.id, ...getTimestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}
