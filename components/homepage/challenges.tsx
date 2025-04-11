'use client';

import Projectcard from '@/components/common/homepage/project-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import SkeletonCard from '@/components/common/challenge-skeleton-card';
import NoChallengeFound from '../common/no-challenge-found';

const Challenges = () => {
  const { data, isLoading } = useGetChallengesQuery({ limit: 3, page: 1, status: 'no-draft' });
  const challengesData = data?.data.challenges;

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="text-center text-black py-20 xl:w-1/2 md:w-2/3 mx-auto"
      >
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Explore Challenges & Hackathons 
        </h1>
        <p className="my-4 text-primary_grey">
          Join Skills Challenges Program to accelerate your career growth and
          become part of Africa’s largest workforce of digital professionals. 
        </p>
      </motion.div>{' '}
      {isLoading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard className="w-full" key={index} />
          ))}
        </div>
      ) : challengesData && challengesData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6 flex-wrap lg:w-[80%] w-full justify-center mx-auto"
        >
          {challengesData?.map((challenge, index) => (
            <Projectcard className="w-full" key={index} project={challenge} />
          ))}
        </motion.div>
      ) : (
        <NoChallengeFound isAdmin={false} />
      )}
      <div>
        <Link className="flex justify-center my-10" href="/challenges">
          <Button
            className="border-primary hover:text-primary px-14 py-6 border-2 font-semibold"
            size="lg"
            variant="outline"
          >
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Challenges;
