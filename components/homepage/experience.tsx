'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { SchoolCaseIcon } from '@/lib/images';
import { motion } from 'framer-motion';

const GainExperience = () => {
  const experiences = [
    {
      title: 'Build a Strong Portfolio and Hands-On Experience',
      description:
        'Tackle real-world projects through challenges and hackathons that mirror real-world challenges faced by businesses and organizations. Showcase your skills and accomplishments to potential employers and clients through a portfolio of completed projects.',
    },
    {
      title: 'Enhance Your Employment Path',
      description:
        'Develop in-demand skills and build a strong portfolio to increase your chances of landing your dream job or contract.',
    },
    {
      title: 'Earn Recognition and Prizes',
      description:
        'Earn both money and knowledge prizes by participating in various contests and competitions, working on real-world projects and hackathons from our partner companies & organizations.',
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
          Experience a New Way of Building Work Experience
        </h1>
        <p className="my-4 text-primary_grey">
          Join the Skills Challenges Program to accelerate your career growth
          and become part of Africa’s largest workforce of digital
          professionals.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: 'easeInOut',
              staggerChildren: 0.3,
            },
          },
        }}
        className="grid md:grid-cols-2 gap-6 md:w-11/12 lg:w-4/5 mx-auto"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className={`${
              index === 0 ? 'md:col-span-2' : ''
            } bg-primary rounded-2xl`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeInOut' },
              },
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <Card className="bg-primary text-white border-none shadow-none">
              <CardHeader>
                <CardTitle>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="p-4 bg-white rounded-md w-fit"
                  >
                    <Image src={SchoolCaseIcon} alt="Experience icon" />
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-semibold md:text-2xl text-xl">
                  {experience.title}
                </h1>
              </CardContent>
              <CardFooter>
                <p>{experience.description}</p>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GainExperience;
