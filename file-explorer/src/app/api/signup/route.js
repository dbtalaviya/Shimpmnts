import { User } from '@/app/models/user';
import { dbConnect } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return res.json({ success: false, error: 'Username and password are required' });
    }

    try {
        await dbConnect();
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashPassword
        });
        return NextResponse.json({ success: true, user });
    }
    catch (error) {
        if (error.code === 11000) {
            res.json({ success: false, error: 'Username already exists' });
        } else {
            res.json({ success: false, error: 'Internal server error' });
        }
    }
};
