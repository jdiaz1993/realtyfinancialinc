import { SectionTitle } from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container-page space-y-10">
        <SectionTitle
          eyebrow="About Realty Financial Inc"
          title="A steady, numbers-focused approach to real estate and mortgage decisions."
          subtitle="Realty Financial Inc is built around a simple idea: real estate is both a place to live and a significant financial position. Clients deserve guidance that respects both."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">Firm Overview</h3>
              <p className="text-sm text-slate-300 sm:text-base">
                Based in Los Angeles, Realty Financial Inc focuses on connecting real estate goals
                with sound financing. By combining brokerage expertise with mortgage insight, we
                help clients evaluate options through both lifestyle and balance-sheet lenses.
              </p>
              <p className="text-sm text-slate-300 sm:text-base">
                Clients range from first-time buyers and move-up sellers to investors seeking
                income-producing properties or mixed-use opportunities. In each case, the approach
                is the same: clarify objectives, walk through the numbers, and design a plan that
                fits.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">About George Espinoza</h3>
              <p className="text-sm text-slate-300 sm:text-base">
                As Owner/Broker of Realty Financial Inc,{" "}
                <span className="font-semibold">George Espinoza</span> is closely involved in every
                transaction. Clients value his calm demeanor, attention to detail, and focus on
                aligning financing with long-term plans rather than short-term trends.
              </p>
              <p className="text-sm text-slate-300 sm:text-base">
                George believes that clear communication and realistic expectations are just as
                important as pricing and terms. He aims to remove jargon, explain trade-offs, and
                help clients move at a pace that feels right for them.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">Mission</h3>
              <p className="text-sm text-slate-300 sm:text-base">
                To provide real estate and mortgage guidance that is steady, transparent, and
                grounded in each client&apos;s unique financial picture—so that every decision feels
                both confident and informed.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface h-56 w-full rounded-xl bg-gradient-to-br from-brand-500/35 via-black/60 to-slate-950 ring-1 ring-brand-500/40 sm:h-64">
              <div className="flex h-full flex-col justify-end p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
                  Professional Image Placeholder
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Swap this area for a professional portrait or office photo when assets are ready.
                </p>
              </div>
            </div>

            <div className="card-surface space-y-4 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                Why clients choose Realty Financial Inc
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Integrated perspective on both property and financing</li>
                <li>• Calm, patient communication throughout the process</li>
                <li>• Emphasis on risk, cash flow, and long-term planning</li>
                <li>• Clear explanations of options without unnecessary pressure</li>
                <li>• Local knowledge of Los Angeles neighborhoods and trends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

