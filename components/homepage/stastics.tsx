"use client"

import { formatToK } from '@/lib/format-k';
import { BackgroundSVG2 } from '@/lib/images';
import { useGetCareerStatsQuery } from '@/store/actions/categories';
import { motion } from 'framer-motion';

export interface ICareerStats {
  year: number;
  challengeCount: number;
  usersCount: number;
  countriesCount: number;
}
const Statistics = () => {
  const { data, isLoading, isFetching } = useGetCareerStatsQuery();
  const stats = data?.data;

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto text-white py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ backgroundImage: `url(${BackgroundSVG2.src})` }}
        className="bg-cover bg-center w-5/6 flex items-center justify-center py-24 mx-auto rounded-3xl"
      >
        {isLoading || isFetching ? (<div className="flex items-center justify-center py-10">
          <p className="text-white">Loading...</p>
        </div>) : stats ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(stats)?.map(([key, value], index) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ scale: 1.1 }}
              >
                <h1 className="text-4xl font-bold">
                  {formatToK(Number(value))}{typeof key !== undefined && !key.includes('year') && '+'}
                  <span className="block text-lg font-normal capitalize">{typeof key !== undefined && key.includes('users') ? 'Users' : key.includes('challenge') ? 'Challenges completed' : key.includes('countr') ? 'Countries' : key}</span>
                </h1>
              </motion.div>
            ))}
          </div>
        ) : ""}
      </motion.div>
    </div>
  );
};

export default Statistics;
