import { toast } from '@/hooks/use-toast';

interface ErrorData {
  status: string;
  message: string;
  data: { field: string; message: string };
}

export const handleError = (error: unknown) => {
  console.error('Error:', error);
  if (isCustomError(error)) {
    console.error('Error: reached', error);
    const message = error.data.message || 'An unknown error occurred';

    toast({
      title: 'Something went wrong',
      description: message,
      variant: 'destructive',
    });
  } else {
    toast({
      title: 'Something went wrong',
      description: 'An unexpected error occurred.',
      variant: 'destructive',
    });
  }
};

function isCustomError(error: unknown): error is ErrorData {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const e = error as { data?: unknown };
  return (
    'data' in e &&
    typeof e.data === 'object' &&
    e.data !== null &&
    'message' in e.data &&
    typeof (e.data as { message: unknown }).message === 'string'
  );
}
