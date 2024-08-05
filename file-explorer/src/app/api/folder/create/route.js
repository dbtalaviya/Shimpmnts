import { dbConnect } from "@/app/lib/db";
import { Folder } from "@/app/models/folders";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();

    try {
        await dbConnect();
        console.log(data.name);
        const folder = await Folder.create({
            name: data.name
        });

        return NextResponse.json({ success: true, folder });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed" });
    }
}
