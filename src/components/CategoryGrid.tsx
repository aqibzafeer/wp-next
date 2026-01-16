import Link from 'next/link';
import { FEATURED_CATEGORIES } from '@/lib/dummyData';

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h2 font-family-heading font-weight-heading mb-4">
            <span className="text-primary">
              Featured Products
            </span>
          </h2>
          <p className="text-text text-lg">
            Discover our carefully curated collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square min-h-72"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center transform transition-all duration-500 group-hover:scale-110">
                  <h3 className="text-h3 font-weight-heading text-white drop-shadow-lg">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
