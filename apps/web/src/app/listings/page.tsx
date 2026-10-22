import Link from "next/link";

import ListingList from "@/components/listing-list";

export default function ListingsPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Listings
                </h1>
                <Link
                    href="/listings/new"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                    + Post listing
                </Link>
            </div>
            <ListingList />
        </div>
    );
}