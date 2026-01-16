'use client';

import HeroSection from '@/components/HeroSection';
import ProductsWithFilters from '@/components/ProductsWithFilters';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsWithFilters products={DUMMY_PRODUCTS} categories={CATEGORIES} href={(id) => `/product/${id}`} />
      </div>
    </div>
  );
}
