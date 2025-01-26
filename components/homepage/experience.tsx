import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { SchoolCaseIcon } from '@/lib/images';

const GainExperience = () => {
  const experiences = [
    {
      title: 'Build a Strong Portfolio and Hand-On Experience',
      description:
        'Tackle real-world projects through challenges and hackathons that mirror real world challenges faced by businesses and organizations. Therefore, showcase your skills and accomplishments to potential employers and clients through a portofolio  of completed projects. ',
    },
    {
      title: 'Enhance Your Employment Path',
      description:
        'elop the in-demand skills and build a strong portofolio to increase your chances of landing your dream job or contract.',
    },
    {
      title: 'Earn Recognition and Prizes',
      description:
        'Earn both Money and Knowledge Prizes by participating in various contests and competitions by working on real world projects and hackathons from our partner companies & organizations',
    },
  ];
  return (
    <div className="bg-secondary_bg px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <div className="text-center text-black py-20 xl:w-1/2 md:w-2/3 mx-auto">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Experience a New Way of Building Work Experience
        </h1>
        <p className="my-4 text-primary_grey">
          Join Skills Challenges Program to accelerate your career growth and
          become part of Africa’s largest workforce of digital professionals. 
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 md:w-11/12 lg:w-4/5 mx-auto">
        {experiences.map((experience, index) => (
          <Card
            key={index}
            className={`${
              index === 0 ? 'md:col-span-2' : ''
            } bg-primary text-white`}
          >
            <CardHeader>
              <CardTitle>
                <div className="p-4 bg-white rounded-md w-fit">
                  <Image src={SchoolCaseIcon} alt="Experience icon" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-semibold md:text-2xl text-xl">
                {experience.title}
              </h1>
            </CardContent>
            <CardFooter>
              <h1>{experience.description}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GainExperience;
