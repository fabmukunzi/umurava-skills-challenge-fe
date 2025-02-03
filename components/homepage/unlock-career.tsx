'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BackgroundSVG, UnlockCareer as UnlockCareerImage } from '@/lib/images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const UnlockCareer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Card
        className="lg:w-5/6 w-11/12 mx-auto my-10 rounded-3xl 2xl:p-14 p-8 bg-center bg-cover text-white"
        style={{ backgroundImage: `url(${BackgroundSVG.src})` }}
      >
        <CardContent className="lg:flex gap-32 max-sm:px-0 justify-between items-center pb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="w-1/2"
          >
            <Image src={UnlockCareerImage} className='h-full' alt="Unlock Career" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="my-10 w-1/2"
          >
            <h1 className="md:text-4xl text-2xl font-bold">
              Ready to Unlock Your Career Potential Today!
            </h1>
            <p className="my-10 text-lg">
              Join a challenge or a hackathon to gain valuable work experience,
              build an impressive portfolio, and increase your chances to land
              job opportunities and accelerate your career growth.
            </p>
            <Link href="/challenges">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 bg-white text-primary hover:bg-white/80 lg:px-12 py-5 lg:py-7 font-semibold"
                >
                  View Challenge
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UnlockCareer;
