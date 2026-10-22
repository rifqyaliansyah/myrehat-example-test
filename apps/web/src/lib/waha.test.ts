import { describe, expect, it, vi } from "vitest";

import { buildReply, handleWahaWebhook, wahaWebhookSchema } from "./waha";

const valid = {
    event: "message",
    payload: { from: "628123456789@c.us", body: "Halo" },
};

describe("validasi webhook waha", () => {
    it("menerima payload valid", () => {
        expect(wahaWebhookSchema.safeParse(valid).success).toBe(true);
    });

    it("menolak payload tanpa bagian payload", () => {
        expect(wahaWebhookSchema.safeParse({ event: "message" }).success).toBe(
            false,
        );
    });

    it("menolak body kosong", () => {
        const bad = {
            event: "message",
            payload: { from: "628123456789@c.us", body: "" },
        };
        expect(wahaWebhookSchema.safeParse(bad).success).toBe(false);
    });

    it("menolak payload tanpa from", () => {
        const bad = { event: "message", payload: { body: "Halo" } };
        expect(wahaWebhookSchema.safeParse(bad).success).toBe(false);
    });
});

describe("format reply", () => {
    it("buildReply mengembalikan to dan reply", () => {
        expect(buildReply("628123456789@c.us", "Hai")).toEqual({
            to: "628123456789@c.us",
            reply: "Hai",
        });
    });

    it("handler membalas {to, reply} dari hasil AI", async () => {
        const generate = vi.fn().mockResolvedValue("Hai, ada yang bisa dibantu?");
        const result = await handleWahaWebhook(valid, generate);
        expect(generate).toHaveBeenCalledWith("Halo");
        expect(result).toEqual({
            status: 200,
            body: { to: "628123456789@c.us", reply: "Hai, ada yang bisa dibantu?" },
        });
    });

    it("tidak memanggil AI kalau payload tidak valid", async () => {
        const generate = vi.fn();
        const result = await handleWahaWebhook({ event: "message" }, generate);
        expect(result.status).toBe(400);
        expect(generate).not.toHaveBeenCalled();
    });
});