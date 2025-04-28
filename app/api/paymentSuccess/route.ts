import { NextResponse } from 'next/server';
import {doc, collection, setDoc, query, where, getDocs} from 'firebase/firestore';
import { db } from '@/app/firebase';

export async function POST(request: Request) {
    try {
        var res = await request.json()
        var order_id = res.obj.order.id
        const ordersQuery = query(
            collection(db, 'orders'),
            where('order_id', '==', order_id)
        );

        const ordersSnapshot = await getDocs(ordersQuery);
        ordersSnapshot.docs.map(async (orderDoc) => {
            if (res.obj.success){
                await setDoc(doc(db, 'orders', orderDoc.id), {payment: 'success'}, {merge: true})
            } else {
                await setDoc(doc(db, 'orders', orderDoc.id), {payment: 'error'}, {merge: true})
            }
        })

        return NextResponse.json({ });
    } catch (error) {
        console.error('Session verification error:', error);
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
} 