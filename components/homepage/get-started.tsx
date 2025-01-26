import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginScreenimage, TalentChallengeDashboardImage } from '@/lib/images';
import Image from 'next/image';

const GetStarted = () => {
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
    <div className="bg-secondary_bg py-20">
      <div className="container mx-auto flex flex-wrap gap-8 md:w-4/5 w-11/12">
        <h1 className="text-2xl lg:text-4xl text-black font-bold mb-10 w-full text-center self-start">
          How to Get Started
        </h1>
        <div className="flex-1 flex flex-col gap-8">
          {stepsToGetStarted.slice(0, 2).map((step, index) => (
            <Card
              key={index}
              className="bg-white text-black relative max-h-full"
            >
              <CardHeader>
                <CardTitle className="bg-primary text-white w-fit text-sm font-normal px-2 rounded-md py-1">
                  Step {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-semibold md:text-2xl text-xl">
                  {step.title}
                </h1>
                <h1 className="my-5">{step.description}</h1>
              </CardContent>
              {step.image && (
                <CardFooter className="justify-end px-0 pb-0">
                  <Image
                    className="relative right-0 bottom-.5 rounded-br-xl rounded-tl-2xl"
                    src={step.image}
                    alt="Step Image"
                  />
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-8 justify-between">
          {stepsToGetStarted.slice(2).map((step, index) => (
            <Card key={index + 2} className="bg-white text-black relative pb-5">
              <CardHeader>
                <CardTitle className="bg-primary text-white w-fit text-sm font-normal px-2 rounded-md py-1">
                  Step {index + 3}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="font-semibold md:text-2xl text-xl">
                  {step.title}
                </h1>
                <h1 className="my-5">{step.description}</h1>
              </CardContent>
              {step.image && (
                <CardFooter className="justify-end px-0 pb-0">
                  <Image
                    className="relative right-0 bottom-0"
                    src={step.image}
                    alt="Step Image"
                  />
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
