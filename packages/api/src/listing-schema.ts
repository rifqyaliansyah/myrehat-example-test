import { z } from "zod";

export const LISTING_CATEGORIES = [
    "Buy Property",
    "Buy land to build homestay",
    "Buy Airbnb Profile",
    "Buy Airbnb Business",
] as const;

export type ListingCategory = (typeof LISTING_CATEGORIES)[number];

export const createListingInput = z.object({
    title: z.string().trim().min(1).max(120),
    price: z.coerce.number().int().positive(),
    location: z.string().trim().min(1).max(120),
    category: z.enum(LISTING_CATEGORIES),
    whatsapp: z
        .string()
        .trim()
        .regex(/^[+]?[0-9]{8,15}$/, "Invalid WhatsApp number"),
});