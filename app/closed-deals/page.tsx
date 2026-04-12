import { SectionTitle } from "@/components/SectionTitle";
import { PropertyCard } from "@/components/PropertyCard";
import { closedDeals } from "@/data/closedDeals";

export default function ClosedDealsPage() {
  return (
    <section className="section">
      <div className="container-page space-y-8">
        <SectionTitle
          eyebrow="Closed Transactions"
          title="A snapshot of completed deals."
          subtitle="These selected transactions illustrate a range of property types, price points, and client objectives across Los Angeles and surrounding areas."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {closedDeals.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-400">
          This list represents a sampling of closed transactions and is provided for illustrative
          purposes only. For details on additional activity or to discuss a specific strategy,
          please reach out directly.
        </p>
      </div>
    </section>
  );
}

