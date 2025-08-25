import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PageLoaderProps {
  variant?: 'full' | 'content' | 'hero';
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ variant = 'full', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div className={`animate-in fade-in-0 duration-500 ${className}`}>
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-2/3 max-w-xl mx-auto" />
            <div className="flex justify-center space-x-4 pt-6">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'content') {
    return (
      <div className={`space-y-8 animate-in fade-in-0 duration-500 ${className}`}>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full page loader
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Navigation skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Skeleton className="h-8 w-24" />
            <div className="hidden md:flex space-x-8">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-18" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex space-x-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero section skeleton */}
      <PageLoader variant="hero" />

      {/* Content sections skeleton */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <PageLoader variant="content" />
      </div>

      {/* Footer skeleton */}
      <div className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;