import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { FiTruck, FiLock, FiStar, FiRotateCcw } from 'react-icons/fi';

export default function Home() {
    const featuredProducts = DUMMY_PRODUCTS.slice(0, 8);
    const latestProducts = DUMMY_PRODUCTS.slice(4, 8);
    const bestSellers = DUMMY_PRODUCTS.slice(0, 4);

  return (
    <div>
      <HeroSection
        title="Welcome to Our Store"
        subtitle="Discover our premium collection of clothing and fashion items"
        ctaText="Shop Now"
        ctaHref="/products"
        image="/products/jeans.jpg"
      />

      <CategoryGrid />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                Latest Products
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Check out our newest arrivals and best sellers</p>
          </div>
          <ProductGrid products={latestProducts} />
          <div className="text-center mt-12">
            <Link href="/products" className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                Why Choose Us
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Experience the difference with our premium service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FiTruck, title: 'Free Shipping', description: 'On orders over ₹500' },
              { icon: FiLock, title: 'Secure Payment', description: 'Safe and encrypted transactions' },
              { icon: FiStar, title: 'Premium Quality', description: 'Best materials and craftsmanship' },
              { icon: FiRotateCcw, title: '30-Day Returns', description: 'Hassle-free return policy' },
            ].map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4 flex justify-center">
                    <IconComponent className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                Best Sellers
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Most popular products loved by our customers</p>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                Customer Reviews
              </span>
            </h2>
            <p className="text-gray-600 text-lg">What our customers say about us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Fashion Enthusiast',
                review: 'Excellent quality products and fast delivery. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Priya Singh',
                role: 'Business Professional',
                review: 'The suits are perfectly tailored and the fabric quality is outstanding.',
                rating: 5,
              },
              {
                name: 'Amit Patel',
                role: 'Regular Customer',
                review: 'Great prices, amazing selection, and wonderful customer service.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-indigo-100 text-lg mb-8">Get exclusive offers, new arrivals, and fashion tips delivered to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-indigo-100 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                  Exclusive Collections
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Explore our curated collections featuring the latest trends and timeless classics. From casual wear to formal attire, 
                we have everything you need to elevate your style.
              </p>
              <div className="flex gap-4">
                <Link href="/products" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  Shop Now
                </Link>
                <Link href="/about" className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg overflow-hidden">
              <img
                src="/products/suit.jpg"
                alt="Exclusive Collection"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products Available' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.number}</div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
