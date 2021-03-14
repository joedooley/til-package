import * as React from 'react';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import 'firebase/auth';
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const fuego = new Fuego(firebaseConfig);

export default function SwrFirestoreProvider({ children }) {
  return <FuegoProvider fuego={fuego}>{children}</FuegoProvider>;
}

SwrFirestoreProvider.propTypes = {
  children: PropTypes.node,
};
