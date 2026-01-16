import React from 'react';
import Image from 'next/image';

interface CTASectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  imageAlt: string;
  buttons?: Array<{
    text: string;
    href: string;
    variant?: 'primary' | 'outline';
  }>;
  imagePosition?: 'left' | 'right';
  imageHeight?: string;
}

export default function CTASection({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  buttons,
  imagePosition = 'right',
  imageHeight = 'h-72 sm:h-96 lg:h-full lg:min-h-[500px]',
}: CTASectionProps) {
  const contentCol = (
    <div className={`space-y-6 sm:space-y-8 ${imagePosition === 'right' ? '' : ''}`}>
      <div>
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
      </div>
      {subtitle && (
        <p className="text-text/80 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          {buttons.map((button, idx) => (
            <a
              key={idx}
              href={button.href}
              className={`px-8 py-4 font-bold rounded-full transition-all duration-300 text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 text-sm sm:text-base ${
                button.variant === 'outline'
                  ? 'border-2 border-primary text-primary hover:bg-secondary/30'
                  : 'bg-primary text-background hover:bg-primary-hover'
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const imageCol = (
    <div className={`relative ${imageHeight} bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden shadow-2xl group`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
      {imagePosition === 'right' ? (
        <>
          {contentCol}
          {imageCol}
        </>
      ) : (
        <>
          {imageCol}
          {contentCol}
        </>
      )}
    </div>
  );
}
