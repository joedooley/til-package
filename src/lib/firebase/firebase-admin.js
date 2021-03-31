import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: 'https://today-i-learned-6eeb1.firebaseio.com',
  });
}

const db = admin.firestore();
const auth = admin.auth();

const FieldValue = admin.firestore.FieldValue;

export { db, auth, FieldValue };
