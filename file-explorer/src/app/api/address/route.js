import { dbConnect } from "@/app/lib/db"
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();
    return NextResponse.json({ message: "HII" });
}