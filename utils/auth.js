import { auth } from '@/app/firebase-admin';
import { db } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Sets a user's role using Firebase Admin SDK
 * @param {string} uid - The user's UID
 * @param {string} role - The role to set ('admin' or 'user')
 */
export async function setUserRole(uid, role) {
    try {
        // Set custom claims (used by middleware)
        await auth.setCustomUserClaims(uid, { role });
        
        // Update role in Firestore (used by client)
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { role });
        
        return true;
    } catch (error) {
        console.error('Error setting user role:', error);
        throw error;
    }
}

/**
 * Gets a user's current role
 * @param {string} uid - The user's UID
 * @returns {Promise<string>} The user's role
 */
export async function getUserRole(uid) {
    try {
        const user = await auth.getUser(uid);
        return user.customClaims?.role || 'user';
    } catch (error) {
        console.error('Error getting user role:', error);
        throw error;
    }
} 