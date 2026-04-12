export const HeroSection = () => {
  const backgroundImage =
    "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative flex min-h-[70vh] items-center md:min-h-[80vh]">
        <div className="container-page py-24 sm:py-28 md:py-32">
          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trusted Real Estate &amp; Mortgage Guidance
            </h1>
            <p className="max-w-md text-sm text-slate-200/90 sm:text-base">
              Realty Financial Inc, led by broker George Espinoza, provides discreet, numbers-first
              guidance for clients buying, selling, or refinancing in Los Angeles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};



