import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  icon?: string;
}

export default function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <div className="text-center group">
      {icon && <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>}
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-background to-background/80 mb-2 group-hover:from-accent group-hover:to-primary transition-all duration-300">
        {number}
      </div>
      <p className="text-background/90 text-sm sm:text-base font-medium">{label}</p>
    </div>
  );
}
