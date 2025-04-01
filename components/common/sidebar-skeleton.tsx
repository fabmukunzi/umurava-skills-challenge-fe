import { Skeleton } from '../ui/skeleton';

const SidebarSkeleton = () => {
  return (
    <div className="bg-primary h-full flex flex-col justify-between px-5">
      <div className="my-5">
        <Skeleton className="h-6 w-32 mb-3" />
      </div>

      <div className="flex flex-col space-y-3">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-md" />
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-4">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col space-y-3">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-11 w-full rounded-md" />
          ))}
        </div>
      </div>

      <div className="py-6 mt-4 px-2 flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
