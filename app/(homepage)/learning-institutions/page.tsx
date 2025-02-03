'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AREDLogo,
  AshesiLogo,
  BackgroundSVG2,
  ChallengesDashboardView,
  CIBALogo,
  GDGLogo,
  IgiheLogo,
  InnovationHubLogo,
  KeplerLogo,
  LateriteLogo,
  SchoolCaseIcon,
  SokoFundLogo2,
  StudentsImage,
  ToriLogo,
  ViamoLogo,
} from '@/lib/images';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const LearningInstitutionsPage = () => {
  const offerings = [
    {
      title: 'Employability and Career Development Opportunities',
      description:
        'Students gain hands-on experience working on real-world challenges and help them build professional networks that increase their chances and readiness of landing job opportunities and this lead to career advancement and long-term success.',
    },
    {
      title: 'Practical Application of Classroom Knowledge',
      description:
        'The Skills Challenges bridge the gap between theoretical learning and practical application, reinforcing what students learn in their academic courses.',
    },
    {
      title: 'Students & Trainees Engagement',
      description:
        'Embed and incorporate Skills Challenges into your courses to give students and trainees hands-on projects and practices that enhance their learning experience and skills mastery. Competitive and project-based challenges keep students motivated and actively engaged in their learning journey.',
    },
    {
      title: 'Industry Mentorship',
      description:
        'Skills Challenges expose students to industry experts and mentors who offer guidance, support, and insights on the trends of digital careers. This can help students gain a deep understanding of their chosen field.',
    },
    {
      title: 'Skills Assessments',
      description:
        'Embed our project-based tests and skills assessments directly into your curriculum.',
    },
  ];

  const partners = [
    ToriLogo,
    GDGLogo,
    AshesiLogo,
    KeplerLogo,
    InnovationHubLogo,
    CIBALogo,
    AREDLogo,
    IgiheLogo,
    ViamoLogo,
    KeplerLogo,
    LateriteLogo,
    SokoFundLogo2,
  ];

  const institutionBenefits = [
    'As Career Development and Job Readiness Program',
    'As Skills Assessments Method after a course or a term',
    'As extracurricular activities to complement academic courses',
    'As the portfolio of the Students',
    'As part of Capstone Projects or final-year assignments',
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between lg:w-5/6 w-11/12 mx-auto gap-10 pt-20 lg:items-center">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2"
        >
          <h1 className="text-lg md:text-xl xl:text-3xl font-bold mb-6">
            Accelerate Your Students and Traineess Employability and Career
            Growth through Project-based Learning Solution
          </h1>
          <p className="text-black text-lg">
            We partner with Universities, Schools, and Trainining Institutions
            to  build the work experience of their students and trainees through
            project based learning challenges and hackathons
          </p>
          <Button className="mt-8 py-6">Partner with us</Button>
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            className="object-cover h-[22rem] w-[35rem] rounded-3xl"
            src={StudentsImage}
            alt="Students working"
          />
        </motion.div>
      </div>

      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="text-center text-black py-20 xl:w-1/2 lg:w-2/3 mx-auto"
        >
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
            Key Offerings & Benefits:
          </h1>
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
          className="grid lg:grid-cols-3 gap-6 md:w-11/12 mx-auto"
        >
          {offerings.map((offer, index) => (
            <motion.div
              className={`${
                index === 3 ? 'lg:col-span-2' : ''
              } bg-primary text-white rounded-xl`}
              key={index}
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
                  <h1 className="font-semibold md:text-xl text-lg">
                    {offer.title}
                  </h1>
                </CardContent>
                <CardFooter>
                  <p className="text-sm">{offer.description}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center mx-auto py-20 md:w-4/5 w-11/12"
      >
        <h1 className="text-xl text-center text-black md:w-3/5 md:text-2xl xl:text-3xl font-bold">
          How Skills Challenges Can Be Integrated into Your Learning Institution
        </h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 my-10">
          {partners.map((logo, index) => (
            <Image key={index} src={logo} alt="Partner Logo" />
          ))}
        </div>
      </motion.div>

      <div className="mx-auto w-10/12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="md:w-3/5 mx-auto"
        >
          <h1 className="text-xl text-center text-black md:text-2xl xl:text-3xl font-bold">
            How Skills Challenges Can Be Integrated into Your Learning
            Institution
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:gap-20 gap-5 justify-center py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="lg:w-[34%]"
          >
            {institutionBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-2 my-5 text-black"
              >
                <p className="bg-primary flex items-center justify-center h-10 w-10 rounded-full border border-black text-white text-xl font-semibold shrink-0">
                  {index + 1}
                </p>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-[26rem]"
            whileHover={{ scale: 1.05 }}
          >
            <Image src={ChallengesDashboardView} alt="Dashboard view" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ backgroundImage: `url(${BackgroundSVG2.src})` }}
        className="flex flex-col items-center bg-cover bg-center w-5/6 py-20 my-20 mx-auto rounded-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-white text-3xl font-semibold md:w-1/3 text-center"
        >
          Ready to transform your learning institution?
        </motion.h1>
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          <Button
            variant="outline"
            className="w-52 py-6 my-4 text-lg font-medium"
          >
            Let’s Partner
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LearningInstitutionsPage;
