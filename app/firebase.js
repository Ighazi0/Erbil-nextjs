import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore , enableIndexedDbPersistence } from "@firebase/firestore";
import "firebase/storage";
// Corrected storageBucket URL
const firebaseConfig = {
  apiKey: "AIzaSyAc70bPjm4H43-lFNE0337L9u3eGG6MSQ0",
  authDomain: "erbilcarrentalnet.firebaseapp.com",
  projectId: "erbilcarrentalnet",
  storageBucket: "erbilcarrentalnet.firebasestorage.app",
  messagingSenderId: "981983743725",
  appId: "1:981983743725:web:610d86c1d80ecc00afc6e4",
  measurementId: "G-46KX3GXKX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable Firestore offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error(
      "Multiple tabs open, persistence can only be enabled in one tab at a time."
    );
  } else if (err.code === "unimplemented") {
    console.error(
      "The current browser does not support all of the features required to enable persistence."
    );
  }
});
