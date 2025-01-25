import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BackgroundSVG,
  HomeImage,
  LoginScreenimage,
  SchoolCaseIcon,
  TalentChallengeDashboardImage,
  UnlockCareer,
} from '@/lib/images';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Home() {
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
  const stats = [
    { value: '1', label: 'Year' },
    { value: '500 +', label: 'Challenges completed' },
    { value: '10K+', label: 'Users' },
    { value: '6+', label: 'Countries' },
  ];
  const skills = [
    'UI/UX Design',
    'Data Science',
    'Graphic Design',
    'Data Analysis & Research',
    'Animation',
    'Videography & Photography',
    'Data Science',
    'AI & Machine Learning',
    'Web3',
    'Digital Marketing & Communications ',
  ];
  const stepsToGetStarted = [
    {
      title: 'Sign up on Umurava Platform',
      description: 'Submit your completed project for evaluation',
      image: LoginScreenimage,
    },
    {
      title: 'Browse Open Challenges',
      description:
        'Explore the range of challenges and hackathons and choose one that aligns with your interests and career goals',
      image: TalentChallengeDashboardImage,
    },
    {
      title: 'Register and Participate',
      description:
        'Sign up for the challenge and start working on the project.',
    },
    {
      title: 'Submit your work',
      description: 'Submit your completed project for evaluation',
    },
    {
      title: 'Receive Feedback and Recognition',
      description: 'Get feedback on your work and celebrate your achievements',
    },
  ];
  return (
    <Fragment>
      <div className="flex max-sm:flex-wrap max-sm:flex-col-reverse items-center px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10 2xl:py-24">
        <div className="w-full lg:w-1/2 py-10 lg:py-20 px-6 lg:px-10 2xl:px-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold">
            Build Work Experience through Skills Challenges Program
          </h1>
          <p className="my-6 lg:my-10 text-black text-lg 2xl:text-xl">
            Enhance your Employability and Accelerate your Career Growth by
            working on Hands-on projects & hackathons from various businesses &
            organizations.
          </p>
          <Button
            size="lg"
            className="px-8 lg:px-12 py-5 lg:py-7 font-medium text-sm lg:text-lg"
          >
            Get Started
          </Button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={HomeImage}
            alt="Homepage Image"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-full h-auto"
          />
        </div>
      </div>
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
      <div className="mx-auto text-white py-10">
        <div
          style={{ backgroundImage: `url(${BackgroundSVG.src})` }}
          className="bg-cover bg- w-5/6 flex items-center justify-around py-20 mx-auto rounded-3xl"
        >
          {stats.map((stat, index) => (
            <div key={index}>
              <h1 className="text-3xl font-bold">
                {stat.value}
                <span className="block text-base font-normal">
                  {stat.label}
                </span>
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
        <div className="text-center text-black py-20 md:w-1/2 mx-auto">
          <h1 className="2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold">
            Skills Challenges Cover various in-demand skills  and Careers for
            the digital economy
          </h1>
          <p className="my-4 text-primary_grey">
            Explore the projects that various talents are working on.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-10 mx-auto justify-items-start w-1/2">
          {skills.slice(2, skills.length).map((experience, index) => (
            <Button key={index} className="bg-secondary_bg text-black w-fit">
              {experience}
            </Button>
          ))}
        </div>
      </div>
      <div
        className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:grid-auto-rows-auto"
        style={{ gridAutoRows: '1fr' }}
      >
        {stepsToGetStarted.map((step, index) => (
          <Card
            key={index}
            className={`bg-white text-black`}
          >
            <CardHeader>
              <CardTitle className='bg-primary text-white w-fit text-base font-normal px-2 rounded-md py-1'>
                Step {index+1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-semibold md:text-2xl text-xl">
                {step.title}
              </h1>
            </CardContent>
            <CardFooter>
              <h1>{step.description}</h1>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card
        className="md:w-5/6 w-11/12 mx-auto my-10 rounded-2xl 2xl:p-14 p-8 bg-center bg-cover text-white"
        style={{ backgroundImage: `url(${BackgroundSVG.src})` }}
      >
        <CardContent className="sm:flex gap-32 max-sm:px-0 justify-between items-center pb-0">
          <Image src={UnlockCareer} alt="Unlock Career" />
          <div className="my-10">
            <h1 className="md:text-4xl text-2xl font-bold">
              Ready to Unlock Your Career Potential Today!
            </h1>
            <p className="my-10 text-lg">
              Join a challenge or a hackathon to gain valuable work experience,
              build an impressive portfolio, and increase your chances to land
              job opportunities and accelerate your career growth.
            </p>
            <Link href="/challenges">
              <Button
                size="lg"
                className="px-8 bg-white text-primary hover:bg-white/80 lg:px-12 py-5 lg:py-7 font-semibold"
              >
                View Challenge
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
