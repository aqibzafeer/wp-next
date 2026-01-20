'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DUMMY_PRODUCTS } from './dummyData';
import type { CartItem, ProductInfo, CartContextType } from '@/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart)); // eslint-disable-line react-hooks/set-state-in-effect
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (productId: number, quantity: number = 1) => {
    const product = DUMMY_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const price = product.sale_price || product.price;
      return [
        ...prevItems,
        {
          id: productId,
          quantity,
          price,
          name: product.name,
          image: product.image,
          category: product.category,
        },
      ];
    });
  };

  // Add product directly with product info (for WooCommerce products)
  const addProductToCart = (product: ProductInfo, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const price = product.sale_price || product.price;
      return [
        ...prevItems,
        {
          id: product.id,
          quantity,
          price,
          name: product.name,
          image: product.image,
          category: product.category,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addProductToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
