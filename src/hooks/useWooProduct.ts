import { useState, useEffect } from 'react';
import {
  fetchWooProductById,
  fetchWooProductVariations,
} from '@/lib/woocommerceAPI';
import type { WooProduct, WooVariation, WooDefaultAttribute } from '@/types';

interface UseWooProductReturn {
  product: WooProduct | null;
  variations: WooVariation[];
  loading: boolean;
  error: string | null;
  selectedVariant: WooVariation | null;
  selectedAttributes: Record<string, string>;
  setSelectedAttributes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setSelectedVariant: React.Dispatch<React.SetStateAction<WooVariation | null>>;
}

/**
 * Custom hook for fetching a single WooCommerce product with variations
 * Handles complex variable product logic
 */
export function useWooProduct(productId: number): UseWooProductReturn {
  const [product, setProduct] = useState<WooProduct | null>(null);
  const [variations, setVariations] = useState<WooVariation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<WooVariation | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const wooProduct = await fetchWooProductById(productId);

        if (!wooProduct) {
          setError('Product not found');
          return;
        }

        setProduct(wooProduct);

        // Load variations for variable products
        if (
          wooProduct.type === 'variable' &&
          wooProduct.variations &&
          wooProduct.variations.length > 0
        ) {
          const variationsList = await fetchWooProductVariations(productId);
          setVariations(variationsList);

          // Set default selected attributes
          if (wooProduct.default_attributes && wooProduct.default_attributes.length > 0) {
            const defaults = buildDefaultAttributes(wooProduct.default_attributes);
            setSelectedAttributes(defaults);

            // Find and select matching variation
            const matchedVariation = findMatchingVariation(
              variationsList,
              wooProduct.default_attributes
            );
            if (matchedVariation) {
              setSelectedVariant(matchedVariation);
            }
          }
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  return {
    product,
    variations,
    loading,
    error,
    selectedVariant,
    selectedAttributes,
    setSelectedAttributes,
    setSelectedVariant,
  };
}

// Helper functions
function buildDefaultAttributes(
  defaultAttributes: WooDefaultAttribute[]
): Record<string, string> {
  const defaults: Record<string, string> = {};
  defaultAttributes.forEach((attr) => {
    const slug = attr.name.toLowerCase().replace(/\s+/g, '-');
    defaults[slug] = attr.option;
  });
  return defaults;
}

function findMatchingVariation(
  variations: WooVariation[],
  defaultAttributes: WooDefaultAttribute[]
): WooVariation | undefined {
  return variations.find((variation) =>
    defaultAttributes.every((defaultAttr) =>
      variation.attributes.some(
        (a) => a.name === defaultAttr.name && a.option === defaultAttr.option
      )
    )
  );
}
