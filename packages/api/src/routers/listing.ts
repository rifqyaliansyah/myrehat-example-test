import { listing } from "@myrehat-task-b/db/schema/listing";
import { ORPCError } from "@orpc/server";
import { desc } from "drizzle-orm";

import { protectedProcedure, publicProcedure } from "../index";
import { createListingInput } from "../listing-schema";

export const listingRouter = {
    list: publicProcedure.handler(async ({ context }) => {
        return context.db.select().from(listing).orderBy(desc(listing.createdAt));
    }),
    create: protectedProcedure
        .input(createListingInput)
        .handler(async ({ context, input }) => {
            // Requirement: hanya user login yang bisa submit.
            // protectedProcedure sudah enforce via middleware, ini defensive.
            const userId = context.session?.user.id;
            if (!userId) {
                throw new ORPCError("UNAUTHORIZED");
            }
            // DB tidak punya kolom user_id → userId divalidasi tapi tidak disimpan.
            const [created] = await context.db
                .insert(listing)
                .values({
                    title: input.title,
                    price: String(input.price),
                    location: input.location,
                    category: input.category,
                    contactWa: input.whatsapp,
                })
                .returning();
            return created;
        }),
};