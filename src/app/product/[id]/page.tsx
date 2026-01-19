'use client';

import HeroSection from '@/components/HeroSection';
import Button from '@/components/Button';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { calculateDiscount } from '@/lib/utils';
import Link from 'next/link';
import ProductAddToCart from '@/components/ProductAddToCart';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiHeart, FiCheck, FiX, FiShoppingCart } from 'react-icons/fi';
import { fetchWooProductById } from '@/lib/woocommerceAPI';
import { useToast } from '@/lib/toasterContext';
import { useCart } from '@/lib/cartContext';
import type { WooProduct } from '@/types';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<WooProduct | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();
  const { addProductToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const productId = parseInt(params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from WooCommerce first
        const wooProduct = await fetchWooProductById(productId);
        
        if (wooProduct) {
          setProduct(wooProduct);
        } else {
          // Fallback to dummy products
          const dummyProduct = DUMMY_PRODUCTS.find(p => p.id === productId);
          if (dummyProduct) {
            setProduct(dummyProduct);
          } else {
            setError('Product not found');
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        // Fallback to dummy products on error
        const dummyProduct = DUMMY_PRODUCTS.find(p => p.id === productId);
        if (dummyProduct) {
          setProduct(dummyProduct);
        } else {
          setError('Failed to load product');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    addProductToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      image: product.image,
      category: product.category,
    }, 1);
    addToast(`${product.name} added to cart`, 'success', 3000);
    setIsAdding(false);
  };

  if (loading) {
    return (
      <div>
        <HeroSection
          title="Loading..."
          subtitle="Please wait while we load the product details"
          minHeight="sm"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div>
        <HeroSection
          title="Product Not Found"
          subtitle="The product you're looking for doesn't exist"
          minHeight="sm"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button href="/shop" variant="primary">
            ← Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.price, product.sale_price!) : 0;

  return (
    <div>
      <HeroSection
        title={product.name}
        subtitle={product.category}
        minHeight="sm"
        image={product.image}
      />

      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <Button href="/shop" variant="outline" size="sm">
              <FiArrowLeft className="mr-2" /> Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary to-background rounded-2xl overflow-hidden h-96 sm:h-[500px] lg:h-[600px] shadow-lg group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {hasDiscount && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  -{discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">
                  {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading mb-4">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="space-y-3">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Rs {product.sale_price}
                    </span>
                    <span className="text-lg sm:text-xl text-text/50 line-through">Rs {product.price}</span>
                  </div>
                ) : (
                  <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Rs {product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-text/80 text-base sm:text-lg leading-relaxed">{product.description}</p>

              {/* Stock Status */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-secondary">
                {product.stock_status === 'instock' ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <FiCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-text">In Stock</p>
                      <p className="text-text/70 text-sm">Ready to ship immediately</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <FiX className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-text">Out of Stock</p>
                      <p className="text-text/70 text-sm">Currently unavailable</p>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || product.stock_status !== 'instock'}
                  className={`px-8 py-4 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.stock_status !== 'instock'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-secondary/30 transition-all duration-300 flex items-center justify-center gap-2">
                  <FiHeart className="w-5 h-5" />
                  Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-secondary">
                <h3 className="font-bold text-lg text-heading mb-4">Product Highlights</h3>
                <ul className="space-y-3 text-text/80">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    High quality premium materials
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Comfortable and breathable fit
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Expertly finished and crafted
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Perfect for any occasion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
