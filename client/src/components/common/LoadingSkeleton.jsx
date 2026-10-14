import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gold-600/20 shadow-xs animate-pulse flex flex-col">
    <div className="aspect-[4/3] bg-beige-light"></div>
    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <div className="h-3 bg-beige rounded w-1/3"></div>
        <div className="h-5 bg-beige-dark rounded w-4/5"></div>
        <div className="h-3 bg-beige rounded w-1/2"></div>
      </div>
      <div className="pt-4 border-t border-beige flex gap-2">
        <div className="h-8 bg-beige rounded flex-1"></div>
        <div className="h-8 bg-gold-200 rounded flex-1"></div>
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const CategoryGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-80 rounded-xl bg-beige-dark/50 border border-gold-600/30 animate-pulse p-6 flex flex-col justify-end space-y-3"
      >
        <div className="h-6 bg-beige rounded w-3/4"></div>
        <div className="h-4 bg-beige-light rounded w-full"></div>
      </div>
    ))}
  </div>
);
