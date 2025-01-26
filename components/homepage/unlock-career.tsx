import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BackgroundSVG, UnlockCareer as UnlockCareerImage } from '@/lib/images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const UnlockCareer = () => {
  return (
    <Card
      className="lg:w-5/6 w-11/12 mx-auto my-10 rounded-2xl 2xl:p-14 p-8 bg-center bg-cover text-white"
      style={{ backgroundImage: `url(${BackgroundSVG.src})` }}
    >
      <CardContent className="lg:flex gap-32 max-sm:px-0 justify-between items-center pb-0">
        <Image className='w-full' src={UnlockCareerImage} alt="Unlock Career" />
        <div className="my-10">
          <h1 className="md:text-4xl text-2xl font-bold">
            Ready to Unlock Your Career Potential Today!
          </h1>
          <p className="my-10 text-lg">
            Join a challenge or a hackathon to gain valuable work experience,
            build an impressive portfolio, and increase your chances to land job
            opportunities and accelerate your career growth.
          </p>
          <Link href="/challenges">
            <Button
              size="lg"
              className="px-8 bg-white text-primary hover:bg-white/80 lg:px-12 py-5 lg:py-7 font-semibold"
            >
              View Challenge
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnlockCareer;
