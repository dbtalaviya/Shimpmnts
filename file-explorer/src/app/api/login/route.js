// pages/api/auth/login.js
import { User } from '@/app/models/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db';

export async function POST(req) {
    const { username, password } = await req.json();
    if (!username || !password) {
        return NextResponse.json({ success: false, error: "Username and password required" });
    }

    try {
        await dbConnect();
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ success: false, error: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ success: false, error: 'Invalid username or password' });
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' });
    }
};

