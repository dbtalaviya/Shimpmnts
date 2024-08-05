import { dbConnect } from "@/app/lib/db";
import { File } from "@/app/models/files";
import { Folder } from "@/app/models/folders";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();

    try {
        await dbConnect();
        if (!data.parent) {
            return NextResponse.json({ success: false, message: "Parent id should be there" });
        }
        const file = await File.create({
            name: data.name,
            parent: data.parent,
            content: data.content
        });
        if (!file) {
            return NextResponse.json({ success: false, message: "Error Creating File" });
        }


        if (data.parent) {
            const par = await Folder.findOne({ _id: data.parent });
            if (!par) {
                return NextResponse.json({ success: false, message: "Wrong parent Id" });
            }
            par.child.push(
                {
                    type: "File",
                    id: file._id
                }
            );
            await par.save();
        }


        return NextResponse.json({ success: true, file });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed" });
    }
}
