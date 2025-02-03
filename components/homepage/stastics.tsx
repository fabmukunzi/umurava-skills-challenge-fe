"use client"

import { BackgroundSVG2 } from '@/lib/images';
import { motion } from 'framer-motion';

const Statistics = () => {
  const stats = [
    { value: '1', label: 'Year' },
    { value: '500+', label: 'Challenges completed' },
    { value: '10K+', label: 'Users' },
    { value: '6+', label: 'Countries' },
  ];

  return (
    <div className="mx-auto text-white py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ backgroundImage: `url(${BackgroundSVG2.src})` }}
        className="bg-cover bg-center w-5/6 flex items-center justify-center py-24 mx-auto rounded-3xl"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.1 }}
            >
              <h1 className="text-4xl font-bold">
                {stat.value}
                <span className="block text-lg font-normal">{stat.label}</span>
              </h1>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
