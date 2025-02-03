import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 border-2 rounded-2xl">
      <Skeleton className="h-44 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
