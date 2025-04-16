
type CTAComponentProps = {
  title: string;
  body: string;
  image: string;
};

export const CTAComponent = ({ body, title, image }: CTAComponentProps) => {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {title}
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">{body}</p>

          <div className="mt-4 md:mt-8">
            <a
              href="/pets/new"
              className="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
            >
              Comenzá ya!
            </a>
          </div>
        </div>
      </div>

      <img
        alt="cta_image"
        src={image}
        className="h-56 w-full object-cover sm:h-full rounded-md lg:-mx-5 md:-mx-5 sm:-mx-5"
      />
    </section>
  );
};
