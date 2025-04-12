import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { handleError } from '@/lib/errorHandler';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleMutation = <T>(
  mutationFn: () => Promise<T>,
  onSuccess?: () => void
) => {
  return async () => {
    try {
      await mutationFn();
      if (onSuccess) onSuccess();
    } catch (error) {
      handleError(error);
    }
  };
};
