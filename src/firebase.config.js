import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC0RMv12TYEeIxKUQGLdlvWRdxVOhZN_b8',
  authDomain: 'd-mart-4eccd.firebaseapp.com',
  projectId: 'd-mart-4eccd',
  storageBucket: 'd-mart-4eccd.appspot.com',
  messagingSenderId: '907369807330',
  appId: '1:907369807330:web:fa168546a7be01c9430dbb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
