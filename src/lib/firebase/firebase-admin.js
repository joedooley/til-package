import admin from 'firebase-admin';

const config = {
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config),
  });
}

const db = admin.firestore();
const auth = admin.auth();

const getFirebaseAdmin = async () => {
  if (!admin.apps.length) {
    await admin.initializeApp(config);
  }

  return admin;
};

export { db, auth, getFirebaseAdmin };
