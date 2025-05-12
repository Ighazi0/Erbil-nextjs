import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db, storage } from "../app/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { ref, uploadBytes } from "firebase/storage";



const uploadFileFromUrl = async (fileUrl, uid,) => {
    try {
        const response = await fetch(fileUrl);
        const fileBlob = await response.blob();

        const fileRef = ref(storage, `contracts/${uid}`);
        await uploadBytes(fileRef, fileBlob);
        console.log("File uploaded successfully");
        return `contracts/${uid}`;
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw new Error("Failed to upload file.");
    }
};

export const Register = async (email, password, additionalData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            first_name: additionalData.first_name || "",
            last_name: additionalData.last_name || "",
            image: additionalData.image || "",
            gender: additionalData.gender || "",
            password: additionalData.password || "",
            deleted: additionalData.deleted || false,
            blocked: additionalData.blocked || false,
            birthday: additionalData.birthday || "",
            createdAt: serverTimestamp(),
        });

        return user;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("This email is already registered. Please try logging in.");
        } else if (error.code === 'auth/weak-password') {
            throw new Error("Weak Password");
        } else {
            throw new Error("Something went wrong. Please try again.");
        }
    }
};




export const Login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (!userDoc.exists()) {
            throw new Error('User data not found');
        }

        const userData = userDoc.data();
        
        // Create session
        const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    ...userData
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create session');
        }

        const data = await response.json();
        return { user: userCredential.user, role: data.role };
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            throw new Error('User not found. Please check your email.');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Invalid password. Please try again.');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email format.');
        } else if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many failed attempts. Please try again later.');
        } else {
            throw new Error(error.message || 'Login failed. Please try again.');
        }
    }
};


export const Logout = async () => {
    try {
        await signOut(auth);
        
        // Clear session cookie
        const response = await fetch('/api/auth/session', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to clear session');
        }
    } catch (error) {
        console.error('Logout error:', error);
        throw new Error('Failed to logout. Please try again.');
    }
};