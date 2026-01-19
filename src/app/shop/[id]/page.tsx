'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import Button from '@/components/Button';
import { fetchWooProductById, fetchWooProductVariations } from '@/lib/woocommerceAPI';
import { useCart } from '@/lib/cartContext';

interface Attribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface DefaultAttribute {
  id: number;
  name: string;
  option: string;
}

interface Variation {
  id: number;
  price: string;
  sale_price: string | null;
  stock_status: string;
  attributes: Array<{ name: string; option: string }>;
  images: Array<{ src: string }>;
}

interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  image: string;
  images: Array<{ src: string }>;
  category: string;
  description: string;
  short_description: string;
  stock_status: string;
  sku: string;
  type?: string;
  attributes?: Attribute[];
  default_attributes?: DefaultAttribute[];
  variations?: number[];
}

export default function WooProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<Variation | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addProductToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const wooProduct = await fetchWooProductById(parseInt(resolvedParams.id));
        if (wooProduct) {
          setProduct(wooProduct);

          // Load variations if it's a variable product
          if (wooProduct.type === 'variable' && wooProduct.variations && wooProduct.variations.length > 0) {
            const variationsList = await fetchWooProductVariations(parseInt(resolvedParams.id));
            setVariations(variationsList);

            // Set default selected attributes
            if (wooProduct.default_attributes && wooProduct.default_attributes.length > 0) {
              const defaults: Record<string, string> = {};
              wooProduct.default_attributes.forEach((attr) => {
                const slug = attr.name.toLowerCase().replace(/\s+/g, '-');
                defaults[slug] = attr.option;
              });
              setSelectedAttributes(defaults);

              // Find and select matching variation
              const matchedVariation = variationsList.find((v: Variation) =>
                wooProduct.default_attributes!.every((defaultAttr) =>
                  v.attributes.some((a) => a.name === defaultAttr.name && a.option === defaultAttr.option)
                )
              );
              if (matchedVariation) {
                setSelectedVariant(matchedVariation);
              }
            }
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [resolvedParams.id]);

  // Handle attribute selection
  const handleAttributeChange = (slug: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [slug]: value };
    setSelectedAttributes(newAttributes);

    // Find matching variation
    if (variations.length > 0) {
      const matched = variations.find((v: Variation) =>
        Object.entries(newAttributes).every(([key, val]) =>
          v.attributes.some((a) => {
            const slugFromName = a.name.toLowerCase().replace(/\s+/g, '-');
            return slugFromName === key && a.option === val;
          })
        )
      );
      if (matched) {
        setSelectedVariant(matched);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <HeroSection title="Loading..." minHeight="sm" />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto mb-4"></div>
            <p className="text-text/70 font-medium">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <HeroSection title="Product Not Found" minHeight="sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <p className="text-text/70 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <Link href="/shop" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Use selected variant data if available, otherwise use product data
  const displayPrice = selectedVariant ? parseFloat(selectedVariant.price) : product.price;
  const displaySalePrice = selectedVariant
    ? selectedVariant.sale_price
      ? parseFloat(selectedVariant.sale_price)
      : null
    : product.sale_price;
  const displayStockStatus = selectedVariant ? selectedVariant.stock_status : product.stock_status;

  const hasDiscount = displaySalePrice && displaySalePrice < displayPrice;
  const discountPercent = hasDiscount ? Math.round(((displayPrice - displaySalePrice!) / displayPrice) * 100) : 0;

  const images = product.images && product.images.length > 0 ? product.images : [{ src: product.image }];

  return (
    <div>
      <HeroSection title={product.name} subtitle={product.category} minHeight="sm" image={product.image} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/shop"
          className="inline-block mb-8 text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <div>
            <div className="mb-6 h-96 sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]?.src || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/cat/women.jpg';
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImage === idx ? 'border-indigo-600' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/cat/women.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-indigo-600 font-bold uppercase text-sm mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="pb-6 border-b border-gray-200">
              {hasDiscount ? (
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl sm:text-4xl font-bold text-indigo-600">
                    Rs {displaySalePrice?.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">Rs {displayPrice.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">Rs {displayPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span
                className={`inline-block text-sm font-semibold px-4 py-2 rounded ${
                  displayStockStatus === 'instock'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {displayStockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* SKU */}
            {product.sku && (
              <div className="mb-6 text-sm">
                <span className="text-gray-600">SKU: </span>
                <span className="font-mono text-gray-900">{product.sku}</span>
              </div>
            )}

            {/* Variant Selection for Variable Products */}
            {product.type === 'variable' && product.attributes && product.attributes.length > 0 && (
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-4">Choose Options</h3>
                {product.attributes
                  .filter((attr) => attr.variation)
                  .map((attr) => (
                    <div key={attr.id} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{attr.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {attr.options.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleAttributeChange(
                                attr.slug,
                                option.toLowerCase().replace(/\s+/g, '-')
                              )
                            }
                            className={`px-4 py-2 rounded border-2 text-sm font-medium transition ${
                              selectedAttributes[attr.slug] === option.toLowerCase().replace(/\s+/g, '-')
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Short Description */}
            {product.short_description && (
              <div className="mb-6 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold text-gray-900 w-12 text-center border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (product && displayStockStatus === 'instock') {
                      addProductToCart({
                        id: product.id,
                        name: product.name,
                        price: displayPrice,
                        sale_price: displaySalePrice,
                        image: product.image,
                        category: product.category,
                      }, quantity);
                      setIsAdded(true);
                      setTimeout(() => setIsAdded(false), 2000);
                    }
                  }}
                  disabled={displayStockStatus !== 'instock'}
                  className={`flex-1 py-3 px-6 rounded font-semibold transition ${
                    displayStockStatus !== 'instock'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                {isAdded && (
                  <Link
                    href="/cart"
                    className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 font-semibold transition"
                  >
                    View Cart
                  </Link>
                )}
                {!isAdded && (
                  <button className="px-6 py-3 border-2 border-gray-300 rounded hover:border-gray-400 transition">
                    ♡ Wishlist
                  </button>
                )}
              </div>
            </div>

            {/* Full Description */}
            {product.description && (
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section Placeholder */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Shopping</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href="/shop"
                className="text-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="mb-2">📦</div>
                <p className="text-sm text-gray-600">Explore More Products</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
