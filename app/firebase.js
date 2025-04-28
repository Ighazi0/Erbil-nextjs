import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore , enableIndexedDbPersistence } from "@firebase/firestore";
import "firebase/storage";
// Corrected storageBucket URL
const firebaseConfig = {
  apiKey: "AIzaSyC5Gt9j-MiaFRZFPrrzubANMthwtWhfnUA",
  authDomain: "erbil-comma.firebaseapp.com",
  projectId: "erbil-comma",
  storageBucket: "erbil-comma.firebasestorage.app",
  messagingSenderId: "436707362957",
  appId: "1:436707362957:web:3f100c7f4f5c366324bac4",
  measurementId: "G-CJY101YR3T"
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
