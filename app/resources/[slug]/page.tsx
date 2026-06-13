import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorPanel } from "@/components/calculators/CalculatorPanel";
import { SectionTitle } from "@/components/SectionTitle";
import { resources } from "@/data/resources";

type ResourceDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug
  }));
}

export default function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const resource = resources.find((item) => item.slug === params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container-page space-y-10">
        <div className="space-y-4">
          <p className="break-words text-xs text-slate-400 sm:text-sm">
            Realty Financial Inc <span className="text-slate-600">&gt;</span> Calculators{" "}
            <span className="text-slate-600">-</span> {resource.title}
          </p>
          <div className="relative h-44 overflow-hidden rounded-xl ring-1 ring-white/10 sm:h-72 lg:h-96">
            <Image
              src="/realtyimages/b7f74503-b35d-45a1-a1f9-d43589acaa12.jpg"
              alt="Residential property"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <nav className="-mx-4 flex gap-5 overflow-x-auto border-b border-white/10 px-4 text-sm text-slate-400 sm:mx-0 sm:gap-6 sm:px-0">
          {resources.map((item) => {
            const active = item.slug === resource.slug;

            return (
              <Link
                key={item.slug}
                href={`/resources/${item.slug}`}
                className={`shrink-0 border-b-2 px-1 pb-3 transition hover:text-white ${
                  active
                    ? "border-brand-500 text-white"
                    : "border-transparent text-slate-400"
                }`}
              >
                {item.title.replace(" Calculator", "")}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-5">
          <SectionTitle
            title={resource.title}
            subtitle={resource.intro}
          />
        </div>

        <CalculatorPanel slug={resource.slug} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div className="space-y-5">
            {resource.sections.map((section) => (
              <article key={section.title} className="card-surface p-5 sm:p-6">
                <h3 className="text-base font-semibold text-slate-50">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-300 sm:text-base">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-5 sm:p-6">
              <h3 className="text-base font-semibold text-slate-50">What to review</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {resource.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-5 sm:p-6">
              <p className="pill text-[11px] text-slate-300">Next Step</p>
              <h3 className="mt-4 text-base font-semibold text-slate-50">
                Talk through your situation
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Every property and financing question depends on the details. Reach out when you
                are ready to review your options.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
              >
                Contact Realty Financial Inc
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
