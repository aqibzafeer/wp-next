import Link from 'next/link';
import { FEATURED_CATEGORIES } from '@/lib/dummyData';

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-h2 font-family-heading font-weight-heading mb-2 sm:mb-4">
            <span className="text-heading">
              Featured Products
            </span>
          </h2>
          <p className="text-text text-sm sm:text-lg">
            Discover our carefully curated collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square min-h-40 sm:min-h-56 lg:min-h-72 flex flex-col items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/30 to-transparent z-10 group-hover:from-text/70 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20 p-2">
                <div className="text-center transform transition-all duration-500 group-hover:scale-110">
                  <h3 className="text-base sm:text-xl lg:text-h3 font-weight-heading text-background drop-shadow-lg leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
