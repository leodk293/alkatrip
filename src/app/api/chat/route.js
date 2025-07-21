import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDb";
import Chat from "@/lib/models/chats";
import User from "@/lib/models/users";

export const POST = async (request) => {
    try {
        const { userRequest, aiResponse, userId, userName } = await request.json();

        await connectMongoDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const chat = new Chat({
            userRequest,
            aiResponse,
            userId,
            userName,
        });
        await chat.save();
        return NextResponse.json({ message: "Chat saved successfully" }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to save chat" }, { status: 500 });
    }
}

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        await connectMongoDB();
        const chats = await Chat.find({ userId });
        return NextResponse.json({ chats });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
    }
}