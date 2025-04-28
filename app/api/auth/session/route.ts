import { NextResponse } from 'next/server';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export async function POST(request: Request) {
    try {
        const { user } = await request.json();
        
        if (!user || !user.uid) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role || 'user' : 'user';

        // Create response with session data
        const response = NextResponse.json({ role });
        
        // Set a session cookie with the user's ID
        response.cookies.set({
            name: 'session',
            value: user.uid,
            maxAge: 60 * 60 * 24 * 5, // 5 days
            httpOnly: false,
            secure: true,
            path: '/',
            sameSite: 'none',
        });

        return response;
    } catch (error) {
        console.error('Session creation error:', error);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ status: 'success' });
    
    response.cookies.set({
        name: 'session',
        value: '',
        maxAge: 0,
        httpOnly: false,
        secure: true,
        path: '/',
        sameSite: 'none',
    });
    
    return response;
} 