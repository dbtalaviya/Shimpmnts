import mongoose from 'mongoose';

let cached = {
    conn: null,
    promise: null,
};

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    } else {
        console.log("here");
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error('Please define the MONGO_URI environment variable inside .env.local');
        }

        const promise = mongoose.connect(MONGO_URI, {
            autoIndex: true,
        });

        cached = {
            conn: await promise,
            promise,
        }

        console.log("mongodb Connected");
        return await promise;
    }
}
