import db from './firebase-admin';

const timestamps = doc => ({
  created: doc.createTime.seconds,
  updated: doc.updateTime.seconds,
});

export async function getAllUsers() {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];

    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function getAllPosts() {
  try {
    const snapshot = await db.collection('post').get();
    const posts = [];

    snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return { posts };
  } catch (error) {
    return { error };
  }
}
