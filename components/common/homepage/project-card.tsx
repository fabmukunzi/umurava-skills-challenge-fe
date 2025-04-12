import { FC } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UmuravaWhiteLogo } from '@/lib/images';
import { Badge } from '../../ui/badge';
import Link from 'next/link';
import { IProject } from '@/lib/types/project';
import { useSession } from 'next-auth/react';
import { useUpdateChallengeStatusMutation } from '@/store/actions/challenge';
import { toast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';

const Projectcard: FC<{
  project: IProject;
  className?: string;
  usage?: 'dashboard' | 'homepage';
}> = ({ project, className, usage = 'homepage' }) => {
  const session = useSession();
  const user = session.data?.user;
  const isAdmin = ['admin', 'super admin'].includes(user?.role?.toLowerCase() || '');
  const [updateChallengeStatus, { isLoading: updatingChallenge }] =
    useUpdateChallengeStatusMutation();

  const statusStyles: Record<string, string> = {
    draft: 'bg-gray-300 text-gray-700 border border-gray-300',
    open: 'bg-blue-100 text-blue-600 border border-blue-500',
    ongoing: 'bg-yellow-200 text-yellow-800 border border-yellow-300',
    closed: 'bg-red-200 text-red-800 border border-red-300',
    completed: 'bg-green-200 text-green-800 border border-green-300',
  };

  const onKickstart = async () => {
    try {
      await updateChallengeStatus({
        id: project._id,
        status: 'open',
      }).unwrap();
      toast({
        title: 'Challenge updated successfully',
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Card className={`text-black ${className}`}>
      <CardContent className="p-4">
        <div className="relative bg-primary h-48 flex items-center justify-center rounded-lg">
          <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
          <Badge
            variant="secondary"
            className={`absolute top-2 font-medium right-2 px-5 py-1.5 rounded-xl ${statusStyles[project?.status?.toLowerCase()] ||
              'bg-gray-200 text-black'
              }`}
          >
            {project?.status}
          </Badge>
        </div>
        <h1 className="font-semibold md:text-lg my-5 text-base truncate">
          {project.challengeName}
        </h1>
        <p className="font-semibold text-[13px] mb-1">Skills Needed:</p>
        <div className="flex gap-2 flex-wrap">
          {project.skills?.map((skill) => (
            <Badge
              className="rounded-xl py-1.5 max-w-screen-sm:text-[10px] text-[10.5px]"
              variant="outline"
              key={skill}
            >
              {skill}
            </Badge>
          ))}
        </div>
        <p className="font-semibold text-[13px] my-3">
          Seniority Level:{' '}
          <span className="font-normal text-primary_grey">
            ({project?.levels?.join(',')})
          </span>
        </p>
        <p className="font-semibold text-[13px]">
          Timeline:{' '}
          <span className="font-normal text-primary_grey">
            {project?.duration} days
          </span>
        </p>
      </CardContent>
      <CardFooter className="border-t items-center justify-between px-5 py-3">
        <Link
          href={`${usage === 'homepage'
            ? `/challenges/${project._id}`
            : `/dashboard/challenges/${project._id}`
            }`}
        >
          <Button size="sm">View Challenge</Button>
        </Link>
        {isAdmin && project.status === 'draft' && (<Button size={'sm'} variant="outline" className={`${statusStyles.completed} hover:bg-green-200/50 hover:text-green-800`} disabled={updatingChallenge} onClick={onKickstart}>{updatingChallenge ? <div className="h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          : 'Publish'}</Button>)}
      </CardFooter>
    </Card>
  );
};

export default Projectcard;
