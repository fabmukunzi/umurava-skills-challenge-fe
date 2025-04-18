'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HomeImage } from '@/lib/images';
import Link from 'next/link';
import { dashboardRoutes } from '@/lib/routes';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div className="flex max-sm:flex-wrap max-sm:flex-col-reverse items-center px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10 2xl:py-24">
      <motion.div
        className="w-full lg:w-1/2 py-10 lg:py-20 px-6 lg:px-10 2xl:px-8"
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold">
          Build Work Experience through Skills Challenges Platform
        </h1>
        <p className="my-6 lg:my-10 text-black text-lg 2xl:text-xl">
          Enhance your Employability and Accelerate your Career Growth By working on Real-World Projects through hackathons, skills competitions, and task challenges from various businesses and organizations.
        </p>
        <Link href={dashboardRoutes.dashboard.path}>
          <Button
            size="lg"
            className="px-8 lg:px-12 py-5 lg:py-7 font-medium text-sm lg:text-lg"
          >
            Get Started
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={HomeImage}
          alt="Homepage Image"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-full h-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
