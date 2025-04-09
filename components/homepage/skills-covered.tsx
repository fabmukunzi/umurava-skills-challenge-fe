'use client';

import { EmblaOptionsType } from 'embla-carousel';
import Carousel from '@/components/common/carousel';
import { SokofundDashboard, SokofundLogo } from '@/lib/images';
import AdvertCard from '@/components/common/homepage/advert-card';
import { motion } from 'framer-motion';
import { useGetSkillsQuery } from '@/store/actions/categories';

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeInOut', staggerChildren: 0.3 },
  },
};

const SkillsCovered = () => {
  const { data, isLoading } = useGetSkillsQuery();
  const skillsData = data?.data;
  const skills = skillsData?.map((skill) => skill.skillName);

  const adverts = Array(4).fill({
    logo: SokofundLogo,
    content:
      'The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.',
    link: 'https://sokofund.com/',
    otherImage: SokofundDashboard,
  });

  const slides = adverts.map((advert, index) => (
    <AdvertCard key={index} advert={advert} />
  ));

  const OPTIONS: EmblaOptionsType = { loop: true };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-primary_grey">Loading...</p>
      </div>
    );
  }
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariant}
        className="text-center text-black py-20 md:w-2/3 mx-auto"
      >
        <h1 className="2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold">
          Skills Challenges Cover various in-demand skills and Careers for the
          digital economy
        </h1>
        <p className="my-4 text-primary_grey">
          Explore the projects that various talents are working on.
        </p>
      </motion.div>
      <div className="mx-auto">
        {skills && [skills?.slice(0, 2), skills?.slice(2, 6), skills?.slice(6, 12)].map(
          (group, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariant}
              className="flex justify-center flex-wrap gap-5 my-5"
            >
              {group?.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariant}
                  className={`${i === 0 && index === 0
                    ? 'bg-primary text-white'
                    : 'bg-secondary_bg hover:bg-secondary_bg text-primary_grey'
                    } md:py-4 py-2 px-4 rounded-lg font-normal md:text-lg w-fit`}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          )
        )}
      </div>
      <div className="my-20 w-11/12 mx-auto">
        <Carousel slides={slides} options={OPTIONS} />
      </div>
    </div>
  );
};

export default SkillsCovered;
