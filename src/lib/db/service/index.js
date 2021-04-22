import { db } from '@lib/firebase/firebase-admin';
import { getTimestamps } from '@util/object';

export async function getCollection(name) {
  const { docs } = await db.collection(name).get();

  const entries = docs.map(doc => {
    const data = doc.data();

    return {
      data: {
        id: doc.id,
        ...data,
        ...getTimestamps(doc, true),
      },
    };
  });

  return { entries };
}
