import { dbConnect } from "@/app/lib/db";
import { Folder } from "@/app/models/folders";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();

    try {
        await dbConnect();
        console.log(data.name);

        const folder = await Folder.create({
            name: data.name,
            parent: data.parent
        });
        if (!folder) {
            return NextResponse.json({ success: false, message: "Error Creating Folder" });
        }
        if (folder.parent) {
            const par = await Folder.findOne({ _id: data.parent });

            if (!par) {
                return NextResponse.json({ success: false, message: "Wrong parent Id" });
            }
            
            par.child.push(
                {
                    type: "Folder",
                    id: folder._id
                }
            );
            await par.save();
        }

        return NextResponse.json({ success: true, folder });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed" });
    }
}
