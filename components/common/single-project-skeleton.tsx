import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SingleChallengeSkeleton = ({isAdmin=false}) => {

  return (
    <div>
      <div className="md:mx-10 py-4">
        <Skeleton className="w-60 h-6 rounded" />
      </div>

      <div className="lg:mx-10 flex md:flex-row flex-col lg:gap-8 gap-5 my-10">
        <Card className="md:w-8/12 p-6">
          <Skeleton className="h-80 w-full rounded-lg mb-6" />
          <Skeleton className="h-8 w-2/3 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
        </Card>

        <div className="lg:w-5/12 md:w-6/12 h-fit">
          {isAdmin ? (
            <>
              <Card className="p-6 mb-6">
                <Skeleton className="h-8 w-2/3 mb-4" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />

                <div className="flex w-full mt-5 gap-6">
                  <Skeleton className="h-12 w-1/2" />
                  <Skeleton className="h-12 w-1/2" />
                </div>
              </Card>

              <Card className="p-6">
                <Skeleton className="h-8 w-2/3 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6">
              <Skeleton className="h-8 w-2/3 mb-4" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-10 w-full mt-4" />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleChallengeSkeleton;
