import nookies from 'nookies';
import { db } from './firebase-admin';
import { validateCookie, clearSessionCookie } from '@lib/firebase/auth/server';

const timestamps = doc => ({
  created: doc.createTime.seconds,
  updated: doc.updateTime.seconds,
});

export async function getUser(uid) {
  const userRef = db.doc(`users/${uid}`);

  try {
    const userDoc = await userRef.get();
    const user = !userDoc.exists
      ? false
      : {
          ...userDoc.data(),
          ...timestamps(userDoc),
        };

    return { user };
  } catch (error) {
    return { error };
  }
}

export async function isAuthenticated(context) {
  const cookies = nookies.get(context);
  const sessionCookie = cookies.session || '';
  const { req, res } = context;

  try {
    const { uid } = await validateCookie(sessionCookie);

    if (!uid) {
      clearSessionCookie(req);
      return false;
    }

    const { user } = await getUser(uid);

    if (!user) {
      clearSessionCookie(req);
      return false;
    }

    return user;
  } catch (error) {
    console.log(`isAuthenticated error:`, JSON.stringify(error));

    clearSessionCookie(req);
    return false;
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
