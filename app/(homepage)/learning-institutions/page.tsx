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

const LearningInstitutionsPage = () => {
  const offerings = [
    {
      title: 'Employability and Career Development Opportunities',
      description:
        'Students gain hands-on experience working on real-world challenges and help them build professional networks that increase their chances and readiness of landing job opportunities and this lead to career advancement and long-term succes..',
    },
    {
      title: 'Practical Application of Classroom Knowledge',
      description:
        'The Skills Challenges bridge the gap between theoretical learning and practical application, reinforcing what students learn in their academic courses. ',
    },
    {
      title: 'Students & Trainees Engagement',
      description:
        'Embed and incorporate Skills Challenges into your courses to give students and trainees hands-on projects and practices  that enhance their learning experience and skills mastery. Competitive and project-based challenges keep students motivated and actively engaged in their learning journey.',
    },
    {
      title: 'Students & Trainees Engagement',
      description:
        'Skills Challenges expose students to industry experts and mentors who offer guidance, support, and insights on the trends of digital careers. This can help students gain a deep understanding of their chosen field. ',
    },
    {
      title: 'Skills Assessments',
      description:
        'Embed our projects based tests and skills assessments directly into your curriculum.',
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
    'As part of Capstone Projects or final-year assignments ',
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between lg:w-5/6 w-11/12 mx-auto gap-10 pt-20 lg:items-center">
        <div className="lg:w-1/2">
          <h1 className="text-lg md:text-xl xl:text-2xl font-bold mb-6">
            Accelerate Your Students and Traineess Employability and Career
            Growth through Project-based Learning Solution
          </h1>
          <p className="text-black">
            We partner with Universities, Schools, and Trainining Institutions
            to  build the work experience of their students and trainees through
            project based learning challenges and hackathons
          </p>
          <Button className="mt-8 py-6">Partner with us</Button>
        </div>
        <Image
          className="object-cover h-[20rem] w-[30rem] rounded-2xl"
          src={StudentsImage}
          alt="Dashboard View"
        />
      </div>
      <div className="w-11/12 mx-auto">
        <div className="text-center text-black py-20 xl:w-1/2 lg:w-2/3 mx-auto">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
            Key Offerings & Benefits:
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 md:w-11/12 mx-auto">
          {offerings.map((offer, index) => (
            <Card
              key={index}
              className={`${
                index === 3 ? 'lg:col-span-2' : ''
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
                <h1 className="font-semibold md:text-xl text-lg">
                  {offer.title}
                </h1>
              </CardContent>
              <CardFooter>
                <h1 className="text-sm">{offer.description}</h1>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto py-20 md:w-4/5 w-11/12">
        <h1 className="text-xl text-center text-black md:w-3/5 md:text-2xl xl:text-3xl font-bold">
          How Skills Challenges Program can Be Integrated into your Learning
          Institution
        </h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-5 my-10">
          {partners.map((logo) => (
            <Image key={logo} src={logo} alt="Partner Logo" />
          ))}
        </div>
      </div>
      <div className="mx-auto w-10/12">
        <div className="md:w-3/5 mx-auto">
          <h1 className="text-xl text-center text-black md:text-2xl xl:text-3xl font-bold">
            How Skills Challenges Program can Be Integrated into your Learning
            Institution
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:gap-20 gap-5 justify-center py-10">
          <div className='lg:w-[34%]'>
            {institutionBenefits.map((benefit, index) => (
              <div
                className="flex items-center gap-2 my-5 text-black"
                key={index}
              >
                <p className="bg-primary flex items-center justify-center h-10 w-10 rounded-full border border-black text-white text-xl font-semibold shrink-0">
                  {index + 1}
                </p>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <Image
            className="w-[26rem]"
            src={ChallengesDashboardView}
            alt="Dashboard view"
          />
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${BackgroundSVG2.src})` }}
        className="flex flex-col items-center bg-cover bg-center w-5/6 py-20 my-20 mx-auto rounded-3xl"
      >
        <h1 className="text-white text-3xl font-semibold md:w-1/3 text-center">
          Ready to transform your learning institution?
        </h1>
        <Button
          variant="outline"
          className="w-52 py-6 my-4 text-lg font-medium"
        >
          Let’s Partner
        </Button>
      </div>
    </div>
  );
};

export default LearningInstitutionsPage;
