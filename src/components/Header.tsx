'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FiHome, FiShoppingBag, FiPackage, FiInfo, FiMessageCircle, FiSearch, FiShoppingCart, FiUser, FiX, FiMenu } from 'react-icons/fi';
import { useCart } from '@/lib/cartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-lg">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image 
              src="/logo.svg" 
              alt="Azlan Garments Logo" 
              width={56} 
              height={56}
              className="w-14 sm:w-16 h-14 sm:h-16"
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Home', icon: FiHome },
              { href: '/about', label: 'About', icon: FiInfo },
              { href: '/products', label: 'Products', icon: FiShoppingBag },
              { href: '/wp-pro', label: 'Wp Products', icon: FiPackage },
              { href: '/contact', label: 'Contact', icon: FiMessageCircle },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 lg:px-4 py-2 text-sm font-medium text-text hover:text-primary transition-colors group flex items-center gap-2 whitespace-nowrap"
                >
                  <IconComponent className="w-4 lg:w-5 h-4 lg:h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}
          </div>

          {/* Cart & Search Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/cart" className="hidden md:flex relative p-2 hover:bg-secondary rounded-lg transition-colors text-text hover:text-primary" title="Cart">
              <FiShoppingCart className="w-5 sm:w-6 h-5 sm:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-background text-xs flex items-center justify-center rounded-full font-weight-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button className="hidden sm:flex p-2 hover:bg-secondary rounded-lg transition-colors text-text hover:text-primary" title="Account">
              <FiUser className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Toggle menu"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu with Backdrop */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/30 md:hidden z-30"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile Menu - Full screen */}
            <div
              ref={menuRef}
              className="fixed inset-0 md:hidden bg-background z-40 flex flex-col overflow-y-auto"
              style={{ top: '4rem' }}
            >
              <div className="flex flex-col gap-1 py-3 px-3 flex-1">
                {[
                  { href: '/', label: 'Home', icon: FiHome },
                  { href: '/about', label: 'About', icon: FiInfo },
                  { href: '/products', label: 'Products', icon: FiShoppingBag },
                  { href: '/wp-pro', label: 'Wp Products', icon: FiPackage },
                  { href: '/contact', label: 'Contact', icon: FiMessageCircle },
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-3 py-3 text-text hover:bg-secondary hover:text-primary rounded-lg transition-colors flex items-center gap-3 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Actions */}
                <div className="border-t border-border mt-2 pt-2 flex gap-2 px-1">
                  <button className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center gap-2 sm:hidden">
                    <FiSearch className="w-5 h-5" />
                    <span className="text-sm">Search</span>
                  </button>
                  <Link href="/cart" className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center relative" onClick={() => setIsMobileMenuOpen(false)}>
                    <FiShoppingCart className="w-5 h-5" />
                    {getTotalItems() > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-background text-xs flex items-center justify-center rounded-full font-weight-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                  <button className="flex-1 px-3 py-2 hover:bg-secondary text-text hover:text-primary rounded-lg transition-colors flex items-center justify-center gap-2 sm:hidden">
                    <FiUser className="w-5 h-5" />
                    <span className="text-sm">Account</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
