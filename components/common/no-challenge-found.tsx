import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';

interface NoChallengeFoundProps {
  isAdmin: boolean;
}

const NoChallengeFound = ({ isAdmin }: NoChallengeFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 space-y-4">
      <span className="text-6xl">🚧</span>
      <h2 className="text-xl font-semibold text-gray-700">
        No challenges... yet!
      </h2>
      <p className="text-sm text-gray-500 max-w-md">
        Looks like nothing’s cooking at the moment. Time to fire up a new
        challenge and get things rolling! 🚀
      </p>
      {isAdmin && (
        <Link href={dashboardRoutes.challengeHackathons.new.path}>
          <Button size="lg" className="mt-2">
            ✨ Create Your First Challenge
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NoChallengeFound;
