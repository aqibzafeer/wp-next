'use client';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="aspect-square bg-gray-200 animate-pulse relative" />

      <div className="p-4">
        <div className="mb-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>

        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4 mb-3" />

        <div className="flex items-baseline gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>

        <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mb-3" />

        <div className="flex gap-2">
          <div className="flex-1 h-9 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 h-9 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
