import { z } from "zod";

export const wahaWebhookSchema = z.object({
    event: z.string().min(1),
    payload: z.object({
        from: z.string().min(1),
        body: z.string().min(1),
    }),
});

export type WahaReply = { to: string; reply: string };

export type WahaResult =
    | { status: 200; body: WahaReply }
    | { status: 400; body: { error: string } };

export type GenerateReply = (message: string) => Promise<string>;

export function buildReply(to: string, reply: string): WahaReply {
    return { to, reply };
}

export async function handleWahaWebhook(
    input: unknown,
    generate: GenerateReply,
): Promise<WahaResult> {
    const parsed = wahaWebhookSchema.safeParse(input);
    if (!parsed.success) {
        return { status: 400, body: { error: "Invalid payload" } };
    }

    const { from, body } = parsed.data.payload;
    const reply = await generate(body);
    return { status: 200, body: buildReply(from, reply) };
}