import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { error?: string }
>(({ className = '', type, error, ...props }, ref) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        className={cn(
          'flex h-10 w-full focus:border-none rounded-md border-none border-input bg-gray-900 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder-gray-400'
        )}
        ref={ref}
        {...props}
      />
      <span className="absolute -bottom-6 right-0 text-red-600 text-sm">
        {error}
      </span>
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
