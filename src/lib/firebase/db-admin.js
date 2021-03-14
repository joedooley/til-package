import nookies from 'nookies';
import { db, auth } from './firebase-admin';

const timestamps = doc => ({
  created: doc.createTime.seconds,
  updated: doc.updateTime.seconds,
});

export async function isAuthenticated(context) {
  try {
    const cookies = nookies.get(context);
    const token = await auth.verifyIdToken(cookies.token);

    // FETCH STUFF HERE!! 🚀

    return {
      uid: token.uid,
      email: token.email,
      name: token.name,
      authTime: token.auth_time,
      photoUrl: token.picture,
      provider: token.firebase.sign_in_provider,
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();

    return err;
  }
}

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

export async function getCollection(name) {
  try {
    const snapshot = await db.collection(name).get();
    const entries = [];

    snapshot.forEach(doc => {
      entries.push({ id: doc.id, ...timestamps(doc), ...doc.data() });
    });

    return { entries };
  } catch (error) {
    return { error };
  }
}
