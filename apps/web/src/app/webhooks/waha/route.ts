import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { NextResponse } from "next/server";

import { handleWahaWebhook } from "@/lib/waha";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT =
    "You are the concierge of BuyHomestay, a marketplace for homestay properties. Answer briefly and helpfully about buying homestays, land, and Airbnb profiles or businesses.";

async function generateReply(message: string): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set");
    }

    const openrouter = createOpenRouter({ apiKey });
    const { text } = await generateText({
        model: openrouter(
            process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash",
        ),
        system: SYSTEM_PROMPT,
        prompt: message,
    });
    return text.trim();
}

export async function POST(request: Request) {
    let json: unknown;
    try {
        json = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    try {
        const result = await handleWahaWebhook(json, generateReply);
        return NextResponse.json(result.body, { status: result.status });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "AI service unavailable" },
            { status: 502 },
        );
    }
}