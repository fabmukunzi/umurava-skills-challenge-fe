import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';

const SkeletonCard: FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={`text-black ${className}`}>
      <CardContent className="p-4">
        <div className="relative bg-primary h-48 flex items-center justify-center rounded-lg">
          <Skeleton className="w-24 h-10" />
          <Badge
            variant="secondary"
            className="absolute top-2 font-medium right-2 px-5 py-1.5 rounded-xl bg-[#0F973D] text-white"
          >
            <Skeleton className="w-16 h-4" />
          </Badge>
        </div>
        <Skeleton className="h-5 w-3/4 my-5" />
        <p className="font-semibold text-[13px] mb-1">Skills Needed:</p>
        <div className="flex gap-2 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-16 rounded-xl" />
          ))}
        </div>
        <p className="font-semibold text-[13px] my-3">
          Seniority Level: <Skeleton className="w-1/2 h-4 inline-block" />
        </p>
        <p className="font-semibold text-[13px]">
          Timeline: <Skeleton className="w-1/4 h-4 inline-block" />
        </p>
      </CardContent>
      <CardFooter className="border-t items-center px-5 py-3">
        <Skeleton className="w-24 h-8 rounded" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
