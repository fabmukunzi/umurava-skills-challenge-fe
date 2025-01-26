import { Badge } from '@/components/ui/badge';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel from '../common/carousel';
import { SokofundDashboard, SokofundLogo } from '@/lib/images';
import AdvertCard from '../common/advert-card';

const SkillsCovered = () => {
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

  const adverts = [
    {
      logo: SokofundLogo,
      content:
        'The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.',
      link: 'https://sokofund.com/',
      otherImage: SokofundDashboard,
    },
    {
      logo: SokofundLogo,
      content:
        'The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.',
      link: 'https://sokofund.com/',
      otherImage: SokofundDashboard,
    },
    {
      logo: SokofundLogo,
      content:
        'The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.',
      link: 'https://sokofund.com/',
      otherImage: SokofundDashboard,
    },
    {
      logo: SokofundLogo,
      content:
        'The Embedded Finance Platform and Payroll Management Software Solutions for your organization and Workforce.',
      link: 'https://sokofund.com/',
      otherImage: SokofundDashboard,
    }
  ];

  const slides=adverts.map((advert)=><AdvertCard key={advert.link} advert={advert} />)

  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <div className="text-center text-black py-20 md:w-2/3 mx-auto">
        <h1 className="2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold">
          Skills Challenges Cover various in-demand skills  and Careers for the
          digital economy
        </h1>
        <p className="my-4 text-primary_grey">
          Explore the projects that various talents are working on.
        </p>
      </div>
      <div className="mx-auto">
        <div className="flex justify-center gap-5 my-5">
          {skills.slice(0, 2).map((experience, index) => (
            <Badge
              key={index}
              className={`${
                index === 0
                  ? 'bg-primary text-white'
                  : 'bg-secondary_bg hover:bg-secondary_bg text-primary_grey'
              } md:py-4 py-2 px-4 rounded-lg font-normal md:text-lg w-fit`}
            >
              {experience}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-5 my-5">
          {skills.slice(2, 6).map((experience, index) => (
            <Badge
              key={index + 2}
              className="bg-secondary_bg hover:bg-secondary_bg md:py-4 py-2 px-4 rounded-lg text-primary_grey font-normal md:text-lg w-fit"
            >
              {experience}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-5 my-2">
          {skills.slice(6, 12).map((experience, index) => (
            <Badge
              key={index + 2}
              className="bg-secondary_bg hover:bg-secondary_bg md:py-4 py-2 px-4 rounded-lg text-primary_grey font-normal md:text-lg w-fit"
            >
              {experience}
            </Badge>
          ))}
        </div>
      </div>
      <div className="my-20 w-11/12  mx-auto">
        <Carousel slides={slides} options={OPTIONS} />
      </div>
    </div>
  );
};

export default SkillsCovered;
