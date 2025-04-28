import { auth, db } from '../app/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const createAdminUser = async () => {
    try {
        const email = 'admin@example.com';
        const password = 'admin123';

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email,
            role: 'admin',
            createdAt: new Date()
        });

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdminUser(); 