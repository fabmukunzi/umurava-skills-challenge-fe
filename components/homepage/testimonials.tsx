'use client';

import Carousel from '@/components/common/carousel';
import TestimonialCard from '@/components/common/homepage/testimonial-card';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion';

const TestimonialSection = () => {
  const isMobile = useIsMobile();

  const slides = Array(isMobile ? 6 : 2)
    .fill(null)
    .map((_, rowIndex) => (
      <motion.div
        className="flex space-x-6"
        key={rowIndex}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: rowIndex * 0.2 }}
        viewport={{ once: true }}
      >
        {isMobile ? (
          <TestimonialCard link={`https://www.youtube.com/embed/RuBohIvzF10?si=oXiuQtjBq_c6mj_O`} />
        ) : (
          <>
            <TestimonialCard link={`https://www.youtube.com/embed/RuBohIvzF10?si=oXiuQtjBq_c6mj_O`} />
            <TestimonialCard link={`https://www.youtube.com/embed/j8v9kIJ_xWE?si=I4WMByDwoZu6hJPB`} />
            <TestimonialCard link={`https://www.youtube.com/embed/wvb_RGG_aq8?si=TUN0Jvhf934wkqPu`} />
          </>
        )}
      </motion.div>
    ));

  const OPTIONS: EmblaOptionsType = {
    loop: true,
    slidesToScroll: 1,
    align: 'start',
  };

  return (
    <motion.div
      className="mx-auto text-black py-10 md:w-5/6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 className="2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold">
          Users are in Love with Skills Challenges Program
        </h1>
        <p className="my-4 text-primary_grey text-lg">
          See what our clients say about working with us. Their success speaks
          for our dedication and expertise.
        </p>
      </motion.div>

      <Carousel slides={slides} options={OPTIONS} />
    </motion.div>
  );
};

export default TestimonialSection;
