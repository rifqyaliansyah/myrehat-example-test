"use client";

import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/utils/orpc";

export default function ListingList() {
    const listings = useQuery(orpc.listing.list.queryOptions());

    if (listings.isLoading) {
        return <p className="text-sm text-muted-foreground">Loading listings...</p>;
    }

    if (!listings.data?.length) {
        return <p className="text-sm text-muted-foreground">No listings yet.</p>;
    }

    return (
        <ul className="grid gap-4 sm:grid-cols-2">
            {listings.data.map((item) => (
                <li key={item.id} className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <h3 className="mt-1 font-medium break-words">{item.title}</h3>
                    <p className="text-sm">{item.location}</p>
                    <p className="mt-2 font-semibold">
                        RM {Number(item.price).toLocaleString("en-US")}
                    </p>
                    <a
                        href={`https://wa.me/${item.contactWa.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm underline"
                    >
                        Contact on WhatsApp
                    </a>
                </li>
            ))}
        </ul>
    );
}