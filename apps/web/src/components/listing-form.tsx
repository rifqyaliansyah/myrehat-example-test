"use client";

import { LISTING_CATEGORIES } from "@myrehat-task-b/api/listing-schema";
import { Button } from "@myrehat-task-b/ui/components/button";
import { Input } from "@myrehat-task-b/ui/components/input";
import { Label } from "@myrehat-task-b/ui/components/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

export default function ListingForm() {
    const { data: session, isPending } = authClient.useSession();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState<string>(LISTING_CATEGORIES[0]);
    const [whatsapp, setWhatsapp] = useState("");

    const createListing = useMutation(
        orpc.listing.create.mutationOptions({
            onSuccess: () => {
                toast.success("Listing created");
                queryClient.invalidateQueries({ queryKey: orpc.listing.list.key() });
                setTitle("");
                setPrice("");
                setLocation("");
                setCategory(LISTING_CATEGORIES[0]);
                setWhatsapp("");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }),
    );

    if (isPending) {
        return <p className="text-sm text-muted-foreground">Loading...</p>;
    }

    if (!session) {
        return (
            <section className="rounded-lg border p-4">
                <h2 className="mb-2 font-medium">Post a listing</h2>
                <p className="text-sm text-muted-foreground">
                    Please{" "}
                    <Link href="/login" className="underline">
                        sign in
                    </Link>{" "}
                    to post a listing.
                </p>
            </section>
        );
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createListing.mutate({
            title,
            price: Number(price),
            location,
            category: category as (typeof LISTING_CATEGORIES)[number],
            whatsapp,
        });
    };

    return (
        <section className="rounded-lg border p-4">
            <h2 className="mb-4 font-medium">Post a listing</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Price (RM)</Label>
                    <Input
                        id="price"
                        type="number"
                        min={1}
                        step={1}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                        required
                    >
                        {LISTING_CATEGORIES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                        id="whatsapp"
                        placeholder="628123456789"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" disabled={createListing.isPending}>
                    {createListing.isPending ? "Saving..." : "Submit listing"}
                </Button>
            </form>
        </section>
    );
}