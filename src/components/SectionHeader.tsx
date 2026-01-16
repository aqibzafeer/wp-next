import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  maxWidth = '2xl',
}: SectionHeaderProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const containerClass = centered ? 'text-center' : 'text-left';
  const contentClass = centered ? 'mx-auto' : '';

  return (
    <div className={`${containerClass} ${contentClass} ${maxWidthClass[maxWidth]}`}>
      {eyebrow && (
        <p className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading mb-4">
        {typeof title === 'string' ? (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {title}
          </span>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-text/80 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
