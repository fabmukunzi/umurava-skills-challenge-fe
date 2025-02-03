import { FC } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UmuravaWhiteLogo } from '@/lib/images';
import { Badge } from '../../ui/badge';
import Link from 'next/link';
import { IProject } from '@/lib/types/project';
import {
  getChallengeDuration,
  getChallengeStatus,
} from '@/lib/get-challenge-duration';

const Projectcard: FC<{
  project: IProject;
  className?: string;
  usage?: 'dashboard' | 'homepage';
}> = ({ project, className, usage = 'homepage' }) => {
  return (
    <Card className={`text-black ${className}`}>
      <CardContent className="p-4">
        <div className="relative bg-primary h-48 flex items-center justify-center rounded-lg">
          <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
          <Badge
            variant="secondary"
            className="absolute top-2 font-medium right-2 px-5 py-1.5 rounded-xl bg-[#0F973D] text-white"
          >
            {getChallengeStatus(project.startDate, project.deadline)}
          </Badge>
        </div>
        <h1 className="font-semibold md:text-lg my-5 text-base truncate">
          {project.challengeTitle}
        </h1>
        <p className="font-semibold text-[13px] mb-1">Skills Needed:</p>
        <div className="flex gap-2">
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
            ({project?.seniority?.join(',')})
          </span>
        </p>
        <p className="font-semibold text-[13px]">
          Timeline:{' '}
          <span className="font-normal text-primary_grey">
            {getChallengeDuration(project.startDate, project.deadline)} days
          </span>
        </p>
      </CardContent>
      <CardFooter className="border-t items-center px-5 py-3">
        <Link
          href={`${
            usage === 'homepage'
              ? `/challenges/${project.id}`
              : `/dashboard/challenges/${project.id}`
          }`}
        >
          <Button size="sm">View Challenge</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Projectcard;
