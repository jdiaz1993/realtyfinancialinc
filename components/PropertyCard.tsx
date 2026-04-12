import Image from "next/image";

export type Property = {
  id: string;
  address: string;
  price: string;
  type: string;
  description: string;
  imageUrl: string;
};

type PropertyCardProps = {
  property: Property;
};

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <article className="card-surface flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Image
          src={property.imageUrl}
          alt={property.address}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {property.type}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
              {property.address}
            </h3>
          </div>
          <p className="text-sm font-semibold text-brand-500 sm:text-base">{property.price}</p>
        </div>
        <p className="text-sm text-slate-400">{property.description}</p>
      </div>
    </article>
  );
};

