// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  memoryLocalCache,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc70bPjm4H43-lFNE0337L9u3eGG6MSQ0",
  authDomain: "erbilcarrentalnet.firebaseapp.com",
  projectId: "erbilcarrentalnet",
  storageBucket: "erbilcarrentalnet.appspot.com", // fixed typo: .app -> .app**spot**.com
  messagingSenderId: "981983743725",
  appId: "1:981983743725:web:610d86c1d80ecc00afc6e4",
  measurementId: "G-46KX3GXKX3",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Storage
export const storage = getStorage(app);

// Firestore: handle SSR/Client IndexedDB availability
let db;

if (typeof window !== "undefined") {
  // Client side (browser) — use persistent cache
  db = initializeFirestore(app, {
    localCache: persistentLocalCache(),
  });
} else {
  // Server side — use in-memory cache
  db = initializeFirestore(app, {
    localCache: memoryLocalCache(),
  });
}

export { db };
