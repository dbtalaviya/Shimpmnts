import { dbConnect } from "@/app/lib/db";
import { Folder } from "@/app/models/folders";
import { NextResponse } from "next/server";
import { File } from "@/app/models/files";

export async function POST(req, res) {
    const { rootId } = await req.json();
    try {
        await dbConnect();

        const folders = await Folder.find({ parent: rootId });
        const files = await File.find({ parent: rootId });

        return NextResponse.json({ success: true, folders, files });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch folders", error });
    }
}
