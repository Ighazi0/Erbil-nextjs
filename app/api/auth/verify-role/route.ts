import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export async function GET() {
    try {
        const sessionCookie = cookies().get('session')?.value;

        if (!sessionCookie) {
            return NextResponse.json({ error: 'No session' }, { status: 401 });
        }

        // Get user role from Firestore using the session cookie (which contains the user ID)
        const userDoc = await getDoc(doc(db, 'users', sessionCookie));

        if (!userDoc.exists()) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const userData = userDoc.data();
        return NextResponse.json({ role: userData.role || 'user' });
    } catch (error) {
        console.error('Session verification error:', error);
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
} 