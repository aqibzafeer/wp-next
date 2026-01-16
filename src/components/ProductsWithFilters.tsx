'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

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
}

export default function ProductsWithFilters({
  products,
  categories,
  href = (id) => `/product/${id}`,
  isWooCommerce = false,
}: ProductsWithFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addProductToCart } = useCart();

  const filteredProducts = useMemo(() => {
    let result = [...products];

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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-6 sticky top-20">
          <h2 className="font-bold text-lg mb-4">Filters</h2>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSortBy('');
              setSearchTerm('');
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Results ({filteredProducts.length})
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredProducts.length > 0 ? (
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
