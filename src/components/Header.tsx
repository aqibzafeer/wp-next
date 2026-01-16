'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiHome, FiShoppingBag, FiPackage, FiInfo, FiMessageCircle, FiSearch, FiShoppingCart, FiUser, FiX, FiMenu } from 'react-icons/fi';
import { useCart } from '@/lib/cartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-background font-weight-bold text-xl">✨</span>
            </div>
            <span className="text-2xl font-weight-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline">
              Azlan Garments
            </span>
            <span className="text-2xl font-weight-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent sm:hidden">
              AG
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Home', icon: FiHome },
              { href: '/products', label: 'Products', icon: FiShoppingBag },
              { href: '/wp-pro', label: 'Wp Products', icon: FiPackage },
              { href: '/about', label: 'About', icon: FiInfo },
              { href: '/contact', label: 'Contact', icon: FiMessageCircle },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-text hover:text-primary transition-colors group flex items-center gap-2"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}
          </div>

          {/* Cart & Search Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-text hover:text-primary" title="Search">
              <FiSearch className="w-6 h-6" />
            </button>
            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition-colors text-text hover:text-primary" title="Cart">
              <FiShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-background text-xs flex items-center justify-center rounded-full font-weight-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-text hover:text-primary" title="Account">
              <FiUser className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="flex flex-col gap-2 py-4">
              {[
                { href: '/', label: 'Home', icon: FiHome },
                { href: '/products', label: 'Products', icon: FiShoppingBag },
                { href: '/wp-pro', label: 'Wp Products', icon: FiPackage },
                { href: '/about', label: 'About', icon: FiInfo },
                { href: '/contact', label: 'Contact', icon: FiMessageCircle },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-text hover:bg-secondary hover:text-primary rounded-lg transition-colors flex items-center gap-3 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="border-t border-border mt-2 pt-2 flex gap-2 px-4">
                <button className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center">
                  <FiSearch className="w-5 h-5" />
                </button>
                <Link href="/cart" className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center relative">
                  <FiShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-background text-xs flex items-center justify-center rounded-full font-weight-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <button className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center">
                  <FiUser className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
