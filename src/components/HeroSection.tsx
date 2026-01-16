import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  minHeight?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
  ctaText?: string;
  ctaHref?: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt = '',
  imagePriority = false,
  minHeight = 'md',
  align = 'center',
  ctaText,
  ctaHref = '/products',
  children,
}: HeroSectionProps) {
  const heightClass =
    minHeight === 'sm'
      ? 'min-h-56'
      : minHeight === 'lg'
        ? 'min-h-96 sm:min-h-[460px]'
        : 'min-h-72 sm:min-h-96';

  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <section className={`relative overflow-hidden ${heightClass} bg-background`}>
      {/* Background image */}
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={imagePriority}
            sizes="100vw"
            fetchPriority={imagePriority ? 'high' : undefined}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" aria-hidden="true" />
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-text/70 sm:bg-text/80" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-background/10 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
      </div>

      <div className="relative z-10">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${heightClass} flex flex-col justify-center`}>
          <div className={`max-w-4xl ${align === 'left' ? 'mx-0' : 'mx-auto'} flex flex-col ${alignClass}`}>
            {eyebrow ? (
              <div className="mb-3 inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-xs sm:text-sm font-weight-bold tracking-widest uppercase text-background backdrop-blur w-fit">
                {eyebrow}
              </div>
            ) : null}

            <h1 className="text-h1 font-weight-heading text-background leading-tight">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-4 text-base sm:text-lg text-background/90 max-w-3xl">
                {subtitle}
              </p>
            ) : null}

            {children || (ctaText && ctaHref) ? (
              <div className="mt-8">
                {children ? (
                  children
                ) : (
                  <Link
                    href={ctaHref}
                    className="inline-block px-8 py-3 bg-background text-text font-weight-bold rounded-lg shadow-lg hover:bg-background/80 transition-all transform hover:-translate-y-1"
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
