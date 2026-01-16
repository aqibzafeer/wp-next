'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCircle } from 'react-icons/fi';

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
  ctaText?: string;
  ctaHref?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  minHeight?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
}

export default function HeroSlider({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  minHeight = 'lg',
  align = 'center',
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);

  const heightClass =
    minHeight === 'sm'
      ? 'min-h-56'
      : minHeight === 'lg'
        ? 'min-h-96 sm:min-h-[460px]'
        : 'min-h-72 sm:min-h-96';

  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  const goToSlide = (index: number) => {
    setCurrentSlide(index % slides.length);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  useEffect(() => {
    if (!isAutoPlay) {
      const timer = setTimeout(() => setIsAutoPlay(true), 3000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlayInterval, slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className={`relative overflow-hidden ${heightClass} bg-background group`}>
      {/* Slides Container */}
      <div className="absolute inset-0">
        {/* Current Slide Image */}
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={currentSlide === 0}
          sizes="100vw"
          fetchPriority={currentSlide === 0 ? 'high' : 'low'}
          className="object-cover transition-opacity duration-1000"
          key={slide.id}
        />

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-text/70 sm:bg-text/80" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-background/10 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${heightClass} flex flex-col justify-center`}>
          <div className={`max-w-4xl ${align === 'left' ? 'mx-0' : 'mx-auto'} flex flex-col ${alignClass} animate-fadeIn`}>
            {slide.eyebrow ? (
              <div className="mb-3 inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-xs sm:text-sm font-weight-bold tracking-widest uppercase text-background backdrop-blur w-fit">
                {slide.eyebrow}
              </div>
            ) : null}

            <h1 className="text-3xl sm:text-4xl lg:text-h1 font-weight-heading text-background leading-tight">
              {slide.title}
            </h1>

            {slide.subtitle ? (
              <p className="mt-4 text-base sm:text-lg text-background/90 max-w-3xl">
                {slide.subtitle}
              </p>
            ) : null}

            {slide.ctaText && slide.ctaHref ? (
              <div className="mt-8">
                <Link
                  href={slide.ctaHref}
                  className="inline-block px-8 py-3 bg-background text-text font-weight-bold rounded-lg shadow-lg hover:bg-background/80 transition-all transform hover:-translate-y-1"
                >
                  {slide.ctaText}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-background/30 hover:bg-background/50 text-background p-2 sm:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-background/30 hover:bg-background/50 text-background p-2 sm:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`p-1 transition-all duration-300 ${index === currentSlide
                ? 'bg-background scale-125'
                : 'bg-background/50 hover:bg-background/75'
              } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          >
            <FiCircle className="w-2 h-2 sm:w-3 sm:h-3" />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-background/30 backdrop-blur px-3 sm:px-4 py-2 rounded-full hidden">
        <p className="text-background text-xs sm:text-sm font-semibold">
          {currentSlide + 1} / {slides.length}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
