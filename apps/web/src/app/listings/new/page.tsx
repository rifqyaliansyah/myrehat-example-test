import Link from "next/link";

import ListingForm from "@/components/listing-form";

export default function NewListingPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-6">
            <div className="mb-6">
                <Link
                    href="/listings"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                    ← Back to listings
                </Link>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Post a listing
                </h1>
            </div>
            <ListingForm />
        </div>
    );
}