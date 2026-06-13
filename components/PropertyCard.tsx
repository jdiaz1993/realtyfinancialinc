export type Property = {
  id: string;
  description: string;
  imageUrl: string;
};

type PropertyCardProps = {
  property: Property;
};

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <article className="card-surface flex flex-col overflow-hidden">
      <div className="w-full overflow-hidden bg-slate-950">
        <img
          src={property.imageUrl}
          alt="Closed transaction property"
          className="h-auto w-full transition duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="text-sm text-slate-400">{property.description}</p>
      </div>
    </article>
  );
};

