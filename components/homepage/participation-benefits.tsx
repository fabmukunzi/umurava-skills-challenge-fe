'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import {
  ChallengesDashboardView,
  DiplomaIcon,
  GrowthIcon,
  MedalIcon,
  WhiteSchoolCase,
} from '@/lib/images';
import { motion } from 'framer-motion';

const ParticipationBenefits = () => {
  const benefits = [
    {
      title: 'Enhance Your Employment Path',
      icon: WhiteSchoolCase,
      description:
        'Network with other talented individuals and learn from their experiences ',
    },
    {
      title: 'Earn Recognition and Prizes',
      icon: DiplomaIcon,
      description:
        'Gain valuable experience and knowledge to advance your career in the digital economy:',
    },
    {
      title: 'Personal Growth',
      icon: GrowthIcon,
      description:
        'Challenge yourself, learn new skills, and expand your professional network. ',
    },
    {
      title: 'Learn from Industry Experts',
      icon: MedalIcon,
      description:
        'Access valuable insights and guidance from experienced professionals in the digital careers fields and spaces. ',
    },
  ];
  return (
    <div className="bg-secondary_bg px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="text-center text-black py-20 xl:w-1/2 md:w-2/3 mx-auto"
      >
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          What else can I gain from participating in Skills Challenges ?
        </h1>
        <p className="my-4 text-primary_grey">
          Join Skills Challenges Program to accelerate your career growth and
          become part of Africa’s largest workforce of digital professionals. 
        </p>
      </motion.div>

      <div className="lg:flex gap-5 max-w-screen-md:flex-wrap items-center justify-center mx-2">
        <div className="grid md:grid-cols-2 gap-6 md:w-11/12 lg:w-4/5 mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
            >
              <Card className="text-black bg-inherit shadow-none border-none">
                <CardHeader className="p-0">
                  <CardTitle>
                    <div className="p-5 bg-primary rounded-md w-fit">
                      <Image src={benefit.icon} alt={benefit.title} />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <h1 className="font-semibold md:text-xl text-lg my-3">
                    {benefit.title}
                  </h1>
                </CardContent>
                <CardFooter className="p-0">
                  <h1 className="text-primary_grey">{benefit.description}</h1>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <Image src={ChallengesDashboardView} alt="Challenges dashboard" />
        </motion.div>
      </div>
    </div>
  );
};

export default ParticipationBenefits;
