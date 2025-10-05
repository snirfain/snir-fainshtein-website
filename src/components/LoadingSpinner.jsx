import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Loading Spinner Component
 * @param {Object} props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to show as fullscreen overlay
 */
const LoadingSpinner = ({ 
  size = 'md', 
  className = '', 
  text = '',
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-blue-600 border-t-transparent',
          sizes[size]
        )}
        role="status"
        aria-label="טוען..."
      />
      {text && <p className="text-[#233071] text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

/**
 * Skeleton Loading Component for content placeholders
 */
export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
};

/**
 * Card Skeleton for loading product/content cards
 */
export const CardSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

