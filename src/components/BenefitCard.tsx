import React from 'react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo';
}

const colorGradients = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  yellow: 'from-yellow-500 to-yellow-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-600',
};

export default function BenefitCard({
  icon,
  title,
  description,
  color = 'blue',
}: BenefitCardProps) {
  return (
    <div className="group relative bg-background rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-secondary/50 hover:border-primary/30">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorGradients[color]} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
        aria-hidden="true"
      />
      <div
        className={`w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br ${colorGradients[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="w-7 sm:w-8 h-7 sm:h-8 text-white">{icon}</div>
      </div>
      <h3 className="font-bold text-lg sm:text-xl text-text mb-2">{title}</h3>
      <p className="text-text/70 text-sm sm:text-base">{description}</p>
    </div>
  );
}
