import React from 'react';
import { FiStar } from 'react-icons/fi';

interface TestimonialCardProps {
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar?: string;
}

export default function TestimonialCard({
  name,
  role,
  review,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="group relative bg-background rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-secondary/50 hover:border-accent/30">
      <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        ″
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <FiStar key={i} className="w-5 sm:w-6 h-5 sm:h-6 text-accent fill-accent" />
        ))}
      </div>
      <p className="text-text/90 mb-6 text-base sm:text-lg leading-relaxed italic">
        "{review}"
      </p>
      <div className="flex items-center gap-3">
        {avatar && (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
            {avatar}
          </div>
        )}
        <div>
          <p className="font-bold text-text text-sm sm:text-base">{name}</p>
          <p className="text-text/60 text-xs sm:text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
