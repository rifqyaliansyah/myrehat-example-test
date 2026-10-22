import Link from "next/link";

import ListingForm from "@/components/listing-form";
import ListingList from "@/components/listing-list";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <section className="py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight break-words sm:text-5xl">
          Book homestays directly with hosts
        </h1>
        <p className="mt-3 text-muted-foreground">
          Find homestay properties and talk to the owner on WhatsApp.
        </p>
      </section>
      <div className="grid gap-8">
        <ListingForm />
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium">Listings</h2>
            <Link href="/listings" className="text-sm underline">
              View all
            </Link>
          </div>
          <ListingList />
        </section>
      </div>
    </div>
  );
}