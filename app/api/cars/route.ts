import { NextResponse } from 'next/server';
import {getCars} from "@/utils/cars";

export async function GET(request: Request) {
    try {
        const cars = await getCars()
        return NextResponse.json(cars);
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
} 