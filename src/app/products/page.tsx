'use client';

import HeroSection from '@/components/HeroSection';
import ProductsWithFilters from '@/components/ProductsWithFilters';
import SectionHeader from '@/components/SectionHeader';
import { DUMMY_PRODUCTS, CATEGORIES } from '@/lib/dummyData';

export default function ProductsPage() {
  return (
    <div>
      <HeroSection
        title="All Products"
        subtitle="Explore our complete collection of premium clothing and fashion items"
        eyebrow="OUR CATALOG"
        image="/products/shirt.jpg"
        minHeight="sm"
        align="center"
      />

      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16">
            <SectionHeader
              eyebrow="BROWSE COLLECTION"
              title="Find Your Perfect Style"
              subtitle="Filter and discover from our extensive collection of premium clothing tailored to match every occasion and preference"
            />
          </div>
          <ProductsWithFilters products={DUMMY_PRODUCTS} categories={CATEGORIES} href={(id) => `/product/${id}`} />
        </div>
      </section>
    </div>
  );
}
