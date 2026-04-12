import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-page space-y-10">
        <SectionTitle
          eyebrow="Contact"
          title="Connect with Realty Financial Inc."
          subtitle="Reach out to discuss a purchase, sale, refinance, or simply to get oriented on current market conditions and financing expectations."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
          <ContactForm />

          <div className="space-y-5">
            <div className="card-surface p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                Direct Contact Details
              </h3>
              <dl className="mt-4 space-y-3 text-sm text-slate-300">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Name
                  </dt>
                  <dd className="mt-1">George Espinoza, Owner/Broker</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Cell
                  </dt>
                  <dd className="mt-1">
                    <a href="tel:3233946494" className="hover:text-white">
                      (323) 394-6494
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Office
                  </dt>
                  <dd className="mt-1">
                    <a href="tel:3235072344" className="hover:text-white">
                      (323) 507-2344
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href="mailto:rfiwgesp@gmail.com" className="hover:text-white">
                      rfiwgesp@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Office Address
                  </dt>
                  <dd className="mt-1 text-slate-300">
                    2141 Colorado Blvd.
                    <br />
                    Los Angeles, CA 90041
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card-surface p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                Business Details
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Realty Financial Inc operates as both a real estate and mortgage broker, helping
                clients understand how purchase terms, loan structure, and timing interact.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Real Estate &amp; Mortgage Broker services</li>
                <li>• Residential, investment, and select commercial properties</li>
                <li>• Support from initial planning through closing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

