import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-white/10 bg-transparent">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200">
              Realty Financial Inc
            </h3>
            <p className="text-sm text-slate-400">
              Real estate and mortgage guidance you can trust, serving clients across Los Angeles.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-1 text-sm text-slate-300">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/closed-deals" className="hover:text-white">
                Closed Deals
              </Link>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contact
            </h4>
            <div className="space-y-1 text-sm text-slate-300">
              <p>George Espinoza, Owner/Broker</p>
              <p>
                Cell:{" "}
                <a href="tel:3233946494" className="hover:text-white">
                  (323) 394-6494
                </a>
              </p>
              <p>
                Office:{" "}
                <a href="tel:3235072344" className="hover:text-white">
                  (323) 507-2344
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:rfiwgesp@gmail.com" className="hover:text-white">
                  rfiwgesp@gmail.com
                </a>
              </p>
              <p className="text-slate-400">
                2141 Colorado Blvd., Los Angeles, CA 90041
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 sm:max-w-xs sm:text-left">
              © {year} Realty Financial Inc. All rights reserved. Real Estate &amp; Mortgage Broker.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-0 sm:justify-end">
              {/* Equal Housing first, REALTOR second; same box + overlap toward REALTOR */}
              <div className="relative h-12 w-36 shrink-0 sm:h-16 sm:w-52">
                <Image
                  src="/footer-equal-housing.png"
                  alt="Equal Housing Opportunity"
                  fill
                  sizes="208px"
                  className="object-contain object-center invert opacity-90"
                />
              </div>
              <div className="relative -ml-10 h-12 w-36 shrink-0 sm:-ml-20 sm:h-16 sm:w-52">
                <Image
                  src="/footer-realtor.png"
                  alt="REALTOR®"
                  fill
                  sizes="208px"
                  className="object-contain object-center invert opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

