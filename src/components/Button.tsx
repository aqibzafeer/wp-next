import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'right',
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2';

  const variants = {
    primary: 'px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-background hover:shadow-lg hover:-translate-y-1 focus-visible:ring-primary/50',
    secondary: 'px-8 py-3 sm:py-4 bg-background text-text border-2 border-primary hover:shadow-lg hover:-translate-y-1 focus-visible:ring-primary/50',
    outline: 'px-8 py-3 sm:py-4 border-2 border-primary text-primary hover:bg-secondary/30 focus-visible:ring-primary/50',
    white: 'px-8 py-3 sm:py-4 bg-white text-primary hover:bg-gray-100 focus-visible:ring-white/50 shadow-lg',
  };

  const sizes = {
    sm: 'text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2',
    md: 'text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3',
    lg: 'text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4',
  };

  const disabledStyles = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {isLoading ? 'Loading...' : children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClass}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClass}
    >
      {buttonContent}
    </button>
  );
}
