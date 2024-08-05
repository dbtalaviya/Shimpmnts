import { dbConnect } from "@/app/lib/db";
import { File } from "@/app/models/files";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { id } = await req.json();
    try {
        await dbConnect();

        const file = await File.findOne({ _id: id });

        return NextResponse.json({ success: true, file });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch folders", error });
    }
}
