import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { handleError } from '@/lib/errorHandler';
import dayjs from 'dayjs';

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

export const getTimeAgo = (date: string | Date) => {
  const now = dayjs();
  const publishDate = dayjs(date);
  const diffHours = now.diff(publishDate, 'hour');

  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const diffDays = now.diff(publishDate, 'day');
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};