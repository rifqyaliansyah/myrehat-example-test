"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ListingForm from "@/components/listing-form";
import { authClient } from "@/lib/auth-client";

export default function NewListingPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <div className="container mx-auto max-w-2xl px-4 py-6">
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

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