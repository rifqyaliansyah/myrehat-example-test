import { generateText } from "ai";
import { opencode } from "ai-sdk-provider-opencode-sdk";

const MODEL_ID = process.env.OPENCODE_MODEL ?? "anthropic/claude-sonnet-4-5";

const SYSTEM_PROMPT =
    "You polish homestay listing descriptions. Keep every fact, fix grammar and spelling, keep it concise and friendly. Reply with the polished description only.";

export async function polishDescription(text: string): Promise<string> {
    const trimmed = text.trim();
    if (!trimmed) {
        throw new Error("Description is empty");
    }

    const { text: polished } = await generateText({
        model: opencode(MODEL_ID),
        system: SYSTEM_PROMPT,
        prompt: trimmed,
    });
    return polished.trim();
}

async function main() {
    const input = process.argv.slice(2).join(" ");
    try {
        console.log(await polishDescription(input));
    } finally {
        await opencode.dispose();
    }
}

if ((import.meta as ImportMeta & { main?: boolean }).main) {
    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}