import { BackgroundSVG2 } from '@/lib/images';

const Statistics = () => {
  const stats = [
    { value: '1', label: 'Year' },
    { value: '500+', label: 'Challenges completed' },
    { value: '10K+', label: 'Users' },
    { value: '6+', label: 'Countries' },
  ];

  return (
    <div className="mx-auto text-white py-10">
      <div
        style={{ backgroundImage: `url(${BackgroundSVG2.src})` }}
        className="bg-cover bg-center w-5/6 flex items-center justify-center py-24 mx-auto rounded-3xl"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h1 className="text-4xl font-bold">
                {stat.value}
                <span className="block text-lg font-normal">{stat.label}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
