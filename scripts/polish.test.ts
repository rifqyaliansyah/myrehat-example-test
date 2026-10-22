import { generateText } from "ai";
import { describe, expect, it, vi } from "vitest";

vi.mock("ai", () => ({ generateText: vi.fn() }));
vi.mock("ai-sdk-provider-opencode-sdk", () => ({
    opencode: Object.assign(vi.fn(() => "mock-model"), {
        dispose: vi.fn(),
    }),
}));

import { polishDescription } from "./polish";

const mockedGenerate = vi.mocked(generateText);

describe("polishDescription", () => {
    it("mengembalikan hasil AI yang sudah di-trim", async () => {
        mockedGenerate.mockResolvedValueOnce({
            text: " Cozy homestay near the beach. ",
        } as never);
        const result = await polishDescription("cozy homestay near beach");
        expect(result).toBe("Cozy homestay near the beach.");
        expect(mockedGenerate).toHaveBeenCalledTimes(1);
    });

    it("mengirim deskripsi sebagai prompt", async () => {
        mockedGenerate.mockResolvedValueOnce({ text: "ok" } as never);
        await polishDescription(" nice place ");
        const call = mockedGenerate.mock.calls.at(-1)?.[0];
        expect(call?.prompt).toBe("nice place");
    });

    it("menolak deskripsi kosong", async () => {
        await expect(polishDescription(" ")).rejects.toThrow("Description is empty");
    });
});