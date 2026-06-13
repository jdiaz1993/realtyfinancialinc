import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { PropertyCard } from "@/components/PropertyCard";
import { closedDeals } from "@/data/closedDeals";
import Link from "next/link";

const highlights = [
  {
    title: "Real Estate Expertise",
    description:
      "Guidance on purchasing, selling, and investing, informed by local market knowledge and experience."
  },
  {
    title: "Mortgage Guidance",
    description:
      "Support through pre-approval, loan options, and navigating lender requirements with clarity."
  },
  {
    title: "Local Market Insight",
    description:
      "Focused on Los Angeles and surrounding communities, with an eye on both numbers and neighborhoods."
  },
  {
    title: "Professional Service",
    description:
      "A steady, detail-oriented approach designed to protect your interests at every step of a transaction."
  }
];

export default function HomePage() {
  const featured = closedDeals.slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="section border-t border-white/[0.06]">
        <div className="container-page space-y-8">
          <SectionTitle
          
            title="Focused on clarity, numbers, and long-term value."
            subtitle="Real estate and mortgage decisions are financial decisions. Our role is to help you see the full picture so you can move forward with confidence."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="card-surface p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <SectionTitle
            
              title="Real estate and mortgage guidance under one roof."
              subtitle="Led by broker George Espinoza, Realty Financial Inc brings together transaction experience and financing insight so clients can make aligned, sustainable decisions."
            />
            <p className="text-sm text-slate-300 sm:text-base">
              Many clients come to us with questions that cross both real estate and lending. By
              understanding how pricing, terms, and structure interact, we help you choose a path
              that fits both your life and your balance sheet.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur-sm transition hover:border-brand-500/60 hover:bg-white/5 hover:text-white"
            >
              Learn more about George
            </Link>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Broker-In-Charge
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">George Espinoza</p>
                <p className="text-sm text-slate-400">Real Estate &amp; Mortgage Broker</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500/60 to-slate-900 ring-2 ring-brand-500/40" />
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Clients appreciate a calm, steady presence—someone who can translate terms,
              walk-through numbers, and help weigh trade-offs without pressure.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-300 sm:text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Direct Line</dt>
                <dd className="mt-1 font-medium text-slate-50">(323) 394-6494</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-slate-400">Office</dt>
                <dd className="mt-1 font-medium text-slate-50">(323) 507-2344</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="container-page space-y-8">
          <SectionTitle
          
            title="Recent transactions that reflect a range of client goals."
            subtitle="From single-family homes to mixed-use and commercial properties, every transaction is approached with careful attention to financing, timing, and risk."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div>
            <Link
              href="/closed-deals"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur-sm transition hover:border-brand-500/60 hover:bg-white/5 hover:text-white"
            >
              View all closed deals
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/[0.06]">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-4">
            <SectionTitle
           
              title="Let&apos;s discuss your next move."
              subtitle="Whether you are exploring a purchase, refinance, or sale, a short conversation can help clarify options and next steps."
            />
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                Call or text{" "}
                <a href="tel:3233946494" className="font-semibold text-brand-500 hover:text-brand-400">
                  (323) 394-6494
                </a>{" "}
                or send a quick note through the contact page.
              </p>
              <p>
                Office: 2141 Colorado Blvd., Los Angeles, CA 90041
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
              >
                Go to Contact Page
              </Link>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
              A straightforward, numbers-first conversation.
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              You&apos;ll walk away with a clearer understanding of current market conditions,
              financing expectations, and a realistic path forward based on your goals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

