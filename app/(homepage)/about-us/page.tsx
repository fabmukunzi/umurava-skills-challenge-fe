import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChallengesDashboardView2, SchoolCaseIcon } from '@/lib/images';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  const solutions = [
    {
      title: 'Bridging the Experience Ga',
      description:
        'Many talents acquired theoretical knowledge and are rejected from jobs because they lack work experience and are not able to put in actions what they acquired in the schools.',
    },
    {
      title: 'Bridging Education and Employment',
      description:
        'Traditional education doesnt’ always prepare talents for the demands of the tech and digital economy and we are providing in-demand skills through Skills Challenges.',
    },
    {
      title: 'Preparing Talents for Global Job Markets',
      description:
        'We are ensuring that African talents shine globally and that’s why we are equipping them with global technical experience and shandout globally. ',
    },
  ];
  return (
    <div className="py-20">
      <div className="flex flex-col-reverse lg:flex-row justify-between md:w-4/5 w-11/12 mx-auto md:gap-32 gap-10 items-center">
        <div className='lg:w-1/2'>
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-6 md:-mt-10">
            Our Story
          </h1>
          <p className="text-black">
            With 3 years of experience matching African digital talents to local
            and global job markets, we still remain with a big number of jobs
            that remain unfilled due to the lack of experienced African Talents.
            <br />
            <br />
            Driven by our mission to place skilled and professional digital
            talent, we created Skills Challenges as a project-based learning
            solution  for talents to gain real-world experience, solve problems,
            and build portfolios so that they become ready for global job
            markets.
          </p>
        </div>
        <iframe
          className="rounded-xl lg:w-1/2 w-full h-[400px] object-cover"
          src={`https://www.youtube.com/embed/EXJPh16MoiU`}
          // controls
          // autoPlay
        ></iframe>
      </div>
      <div className="w-11/12 mx-auto">
        <div className="text-center text-black py-20 xl:w-1/2 lg:w-2/3 mx-auto">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            Why we are solving this problem
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:w-11/12 mx-auto">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className={`${
                index === 0 ? 'md:col-span-2' : ''
              } bg-primary text-white`}
            >
              <CardHeader>
                <CardTitle>
                  <div className="p-4 bg-white rounded-md w-fit">
                    <Image src={SchoolCaseIcon} alt="solution icon" />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-semibold md:text-2xl text-xl">
                  {solution.title}
                </h1>
              </CardContent>
              <CardFooter>
                <h1>{solution.description}</h1>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:w-5/6 w-11/12 mx-auto gap-10 pt-20 lg:items-center">
        <div className="lg:w-1/2">
          <h1 className="text-xl text-black md:text-2xl xl:text-3xl font-bold mb-6">
            Skills Challenges Program is built on the Umurava Talent Marketplace
            Platform
          </h1>
          <p className="text-black">
            A Project-based Learning Solution aimed at providing young and
            senior talents with an opportunity to showcase their skills to
            real-world projects and challenges from our partner companies and
            organizations.
            <br />
            <br />
            Umurava Skills Challenges enables young talents to build a portfolio
            and experience that increases their readiness to access job
            opportunities and projects.
          </p>
          <Button className="mt-8 px-6">Get Started</Button>
        </div>
        <Image
          className="object-fill h-[25rem] w-[30rem] md:-ml-10"
          src={ChallengesDashboardView2}
          alt="Dashboard View"
        />
      </div>
    </div>
  );
};

export default AboutPage;
