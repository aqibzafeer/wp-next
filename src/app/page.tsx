import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import Button from '@/components/Button';
import SectionHeader from '@/components/SectionHeader';
import BenefitCard from '@/components/BenefitCard';
import TestimonialCard from '@/components/TestimonialCard';
import StatCard from '@/components/StatCard';
import CTASection from '@/components/CTASection';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { FiTruck, FiLock, FiRotateCcw, FiChevronRight } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Azlan Garments - Premium Fashion & Clothing Store',
  description: 'Discover premium quality fashion and clothing at Azlan Garments. Shop trendy collections, traditional wear, and exclusive designs. Free shipping on orders over Rs 500.',
  keywords: 'fashion, clothing, store, garments, traditional wear, casual wear, formal suits, premium quality',
  openGraph: {
    title: 'Azlan Garments - Premium Fashion & Clothing',
    description: 'Shop our exclusive collection of premium fashion and clothing online.',
    url: 'https://www.azlangarments.com',
    siteName: 'Azlan Garments',
    images: [
      {
        url: '/banner-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Azlan Garments Store',
      },
    ],
    type: 'website',
  },
};

export default function Home() {
    const featuredProducts = DUMMY_PRODUCTS.slice(0, 8);
    const latestProducts = DUMMY_PRODUCTS.slice(4, 8);
    const bestSellers = DUMMY_PRODUCTS.slice(0, 4);

    const heroSlides = [
      {
        id: '1',
        title: 'Welcome to Our Store',
        subtitle: 'Discover our premium collection of clothing and fashion items',
        eyebrow: 'SHOP',
        image: '/products/jeans.jpg',
        imageAlt: 'Premium denim jeans collection',
        ctaText: 'Shop Now',
        ctaHref: '/products',
      },
      {
        id: '2',
        title: 'Exclusive Collections',
        subtitle: 'Find the perfect outfit for every occasion',
        eyebrow: 'FEATURED',
        image: '/products/suit.jpg',
        imageAlt: 'Formal business suits collection',
        ctaText: 'Browse Suits',
        ctaHref: '/products?category=Suit',
      },
      {
        id: '3',
        title: 'Traditional Wear',
        subtitle: 'Embrace elegance with our traditional collection',
        eyebrow: 'TRENDING',
        image: '/products/kamiz.jpg',
        imageAlt: 'Traditional Kamiz Shalwar collection',
        ctaText: 'Explore Now',
        ctaHref: '/products?category=Kamiz%20Shalwar',
      },
    ];

  return (
    <div>
      <HeroSlider
        slides={heroSlides}
        autoPlay={true}
        autoPlayInterval={5000}
        minHeight="lg"
      />

      <CategoryGrid />

      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <SectionHeader
              eyebrow="NEW ARRIVALS"
              title="Latest Collections"
              subtitle="Discover our newest arrivals handpicked to bring you the latest fashion trends and timeless styles"
            />
          </div>
          <ProductGrid products={latestProducts} />
          <div className="text-center mt-12 sm:mt-16">
            <Button
              href="/products"
              variant="primary"
              size="lg"
              icon={<FiChevronRight />}
              iconPosition="right"
            >
              Explore All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary via-background to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">PREMIUM SERVICE</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Why Choose Us
              </span>
            </h2>
            <p className="text-text/80 text-base sm:text-lg max-w-2xl mx-auto">Experience world-class fashion shopping with our commitment to quality, service, and style</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <BenefitCard icon={<FiTruck />} title="Free Shipping" description="On orders over Rs 500" color="blue" />
            <BenefitCard icon={<FiLock />} title="Secure Payment" description="Safe and encrypted transactions" color="green" />
            <BenefitCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} title="Premium Quality" description="Best materials and craftsmanship" color="yellow" />
            <BenefitCard icon={<FiRotateCcw />} title="30-Day Returns" description="Hassle-free return policy" color="purple" />
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <SectionHeader
              eyebrow="CUSTOMER FAVORITES"
              title="Best Sellers"
              subtitle="Handpicked bestsellers loved and trusted by thousands of satisfied customers"
            />
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary to-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <SectionHeader
              eyebrow="TESTIMONIALS"
              title="Loved by Our Customers"
              subtitle="Real reviews from real customers who have experienced the AG difference"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Fashion Enthusiast',
                review: 'Excellent quality products and fast delivery. Highly recommended!',
                rating: 5,
                avatar: '👨‍💼'
              },
              {
                name: 'Priya Singh',
                role: 'Business Professional',
                review: 'The suits are perfectly tailored and the fabric quality is outstanding.',
                rating: 5,
                avatar: '👩‍💼'
              },
              {
                name: 'Amit Patel',
                role: 'Regular Customer',
                review: 'Great prices, amazing selection, and wonderful customer service.',
                rating: 5,
                avatar: '👨‍🎨'
              },
            ].map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                name={testimonial.name}
                role={testimonial.role}
                review={testimonial.review}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-background/90 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">EXCLUSIVE OFFERS</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background mb-4 sm:mb-5">Stay Updated with AG</h2>
          <p className="text-background/85 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">Subscribe to our newsletter and get exclusive discounts, early access to new collections, and fashion styling tips delivered to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/40 placeholder-white/60 backdrop-blur-sm transition-all duration-300 bg-white/10 text-white"
              required
            />
            <button
              type="submit"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary font-bold rounded-full hover:bg-background transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-background/70 text-xs sm:text-sm mt-5 sm:mt-6">We respect your privacy. Unsubscribe at any time. No spam, only updates you'll love.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <CTASection
            eyebrow="OUR STORY"
            title="Timeless Collections, Modern Style"
            subtitle="Explore our meticulously curated collections featuring the latest trends and timeless classics. From contemporary casual wear to sophisticated formal attire, we have everything you need to express your unique style and elevate your wardrobe."
            image="/products/suit.jpg"
            imageAlt="Exclusive fashion collection from Azlan Garments - Formal suits and premium clothing"
            imagePosition="right"
            buttons={[
              { text: 'Shop Collections', href: '/products', variant: 'primary' },
              { text: 'Learn More', href: '/about', variant: 'outline' },
            ]}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-text via-text/95 to-text text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" aria-hidden="true" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-background mb-3">By The Numbers</h2>
            <p className="text-background/80 text-base sm:text-lg">Our impact and success through the years</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <StatCard number="10K+" label="Happy Customers" icon="😊" />
            <StatCard number="500+" label="Products Available" icon="👕" />
            <StatCard number="98%" label="Satisfaction Rate" icon="⭐" />
            <StatCard number="24/7" label="Customer Support" icon="💬" />
          </div>
        </div>
      </section>
    </div>
  );
}
