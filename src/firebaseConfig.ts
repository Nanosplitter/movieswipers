import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8kQK-KeAYAY36qwky0HJB1rUvRH23Bdc",
  authDomain: "movieswipers.firebaseapp.com",
  projectId: "movieswipers",
  storageBucket: "movieswipers.appspot.com",
  messagingSenderId: "222042662384",
  appId: "1:222042662384:web:682bed4fdd2e18bd08e935",
  measurementId: "G-LF31H445ZX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
