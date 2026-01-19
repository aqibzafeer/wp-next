'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useToast } from '@/lib/toasterContext';
import ProductSkeleton from '@/components/ProductSkeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string;
  category: string;
  stock_status: string;
}

interface ProductsWithFiltersProps {
  products: Product[];
  categories: string[];
  href?: (id: number) => string; // Custom href function for different product sources
  isWooCommerce?: boolean;
  loading?: boolean;
}

export default function ProductsWithFilters({
  products,
  categories,
  href = (id) => `/product/${id}`,
  isWooCommerce = false,
  loading = false,
}: ProductsWithFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addProductToCart } = useCart();
  const { addToast } = useToast();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter out Uncategorized products and placeholder products
    result = result.filter((p) => {
      // Hide products in Uncategorized category
      if (p.category.toLowerCase() === 'uncategorized') {
        return false;
      }
      // Hide placeholder products
      if (p.name.toLowerCase().includes('import placeholder')) {
        return false;
      }
      // Hide products with price 0
      if (p.price === 0 && (!p.sale_price || p.sale_price === 0)) {
        return false;
      }
      return true;
    });

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, sortBy, searchTerm]);

  const calculateDiscount = (price: number, salePrice: number): number => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Enhanced Filters Bar - Always Visible */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl shadow-md border border-gray-200/80 backdrop-blur-sm p-4 md:p-5 transition-all duration-300">
        <div className="flex flex-col gap-4">
          {/* Search Bar - Premium Design */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading && products.length === 0}
              className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl text-sm md:text-base bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:shadow-none placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors text-lg font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Pills - Enhanced Scroll Design */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scroll-smooth">
              <div className="flex gap-2 flex-nowrap md:flex-wrap min-w-max md:min-w-0">
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const productCount = products.filter(p => 
                      cat === 'All' ? true : p.category === cat
                    ).length;
                    
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        disabled={loading && products.length === 0}
                        className={`group relative px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-300'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-indigo-300 hover:shadow-md'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {cat}
                          {!isActive && productCount > 0 && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                              {productCount}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Scroll Indicator Shadows */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
          </div>

          {/* Sort & Actions - Refined Layout */}
          <div className="flex items-center gap-2 md:gap-3 flex-wrap md:flex-nowrap">
            <div className="relative flex-1 md:flex-none md:min-w-[200px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={loading && products.length === 0}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:shadow-none cursor-pointer font-medium text-gray-700"
              >
                <option value="">Sort By: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            {/* Clear Filters Button - Enhanced */}
            {(selectedCategory !== 'All' || sortBy || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSortBy('');
                  setSearchTerm('');
                }}
                disabled={loading && products.length === 0}
                className="px-4 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 whitespace-nowrap"
                title="Clear All Filters"
              >
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary - Enhanced */}
      <div className="flex items-center justify-between px-1 md:px-2">
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  <span className="text-indigo-600">{filteredProducts.length}</span>
                  <span className="text-gray-400 text-lg mx-1">/</span>
                  <span className="text-gray-500 text-lg">{products.length}</span>
                </>
              )}
            </h2>
            <span className="text-sm md:text-base font-medium text-gray-500">
              {loading ? 'products' : 'Products'}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-1 flex items-center gap-2">
            {loading ? (
              'Fetching products from WooCommerce...'
            ) : (
              <>
                {selectedCategory !== 'All' && (
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                    {selectedCategory}
                  </span>
                )}
                {sortBy && (
                  <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium text-xs">
                    Sorted
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium text-xs">
                    Searching
                  </span>
                )}
                {!selectedCategory || selectedCategory === 'All' && !sortBy && !searchTerm ? 'Showing all products' : ''}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => {
              const hasDiscount = product.sale_price && product.sale_price < product.price;
              const discountPercent = hasDiscount ? calculateDiscount(product.price, product.sale_price!) : 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    {product.image ? (
                      <>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/cat/women.jpg';
                          }}
                        />
                        {/* Discount Badge */}
                        {hasDiscount && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              -{discountPercent}%
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition line-clamp-2 text-sm mb-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-3">{product.category}</p>

                    <div className="flex items-baseline gap-2 mb-3">
                      {hasDiscount ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">Rs {product.sale_price!.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through">Rs {product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">Rs {product.price.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ${
                          product.stock_status === 'instock'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (product.stock_status === 'instock') {
                            addProductToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              sale_price: product.sale_price,
                              image: product.image,
                              category: product.category,
                            }, 1);
                            setAddedId(product.id);
                            addToast(`${product.name} added to cart`, 'success', 3000);
                            setTimeout(() => setAddedId(null), 1500);
                          }
                        }}
                        disabled={product.stock_status !== 'instock'}
                        className={`flex-1 px-3 py-2 text-xs rounded font-medium transition ${
                          product.stock_status !== 'instock'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : addedId === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {addedId === product.id ? '✓ Added' : 'Buy'}
                      </button>
                      <Link
                        href={href(product.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded font-medium transition bg-gray-200 text-gray-800 hover:bg-gray-300 text-center"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 font-medium">No products found matching your filters</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
