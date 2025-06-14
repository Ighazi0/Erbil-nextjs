import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAc70bPjm4H43-lFNE0337L9u3eGG6MSQ0",
  authDomain: "erbilcarrentalnet.firebaseapp.com",
  projectId: "erbilcarrentalnet",
  storageBucket: "erbilcarrentalnet.firebasestorage.app",
  messagingSenderId: "981983743725",
  appId: "1:981983743725:web:610d86c1d80ecc00afc6e4",
  measurementId: "G-46KX3GXKX3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
