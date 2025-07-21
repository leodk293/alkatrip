import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const { input } = await req.json();

    const openai = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful and knowledgeable AI travel assistant for a travel website. Your job is to provide accurate, friendly, and concise answers to users' questions about flights, destinations, travel tips, hotel bookings, visas, weather, local attractions, and anything else travel-related. Always prioritize clarity and user experience. Provide clean, readable responses without excessive formatting symbols. If you don't know the answer, suggest helpful alternatives or guide the user where to look.",
                },
                {
                    role: "user",
                    content: input,
                },
            ],
        });

        let content = response.choices[0].message.content;

        // Clean up formatting characters
        content = content
            .replace(/\*\*/g, '') // Remove ** bold markers
            .replace(/\*/g, '')   // Remove * italic markers
            .replace(/\\n/g, '\n') // Convert \\n to actual line breaks
            .replace(/\n\n+/g, '\n\n') // Normalize multiple line breaks
            .trim(); // Remove leading/trailing whitespace

        return NextResponse.json({ message: content });
    } catch (err) {
        console.error("AI API Error:", err);
        return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
    }
}