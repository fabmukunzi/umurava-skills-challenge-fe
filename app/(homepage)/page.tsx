import Challenges from '@/components/homepage/challenges';
import GainExperience from '@/components/homepage/experience';
import GetStarted from '@/components/homepage/get-started';
import HeroSection from '@/components/homepage/hero-section';
import ParticipationBenefits from '@/components/homepage/participation-benefits';
import SkillsCovered from '@/components/homepage/skills-covered';
import Statistics from '@/components/homepage/stastics';
import TestimonialSection from '@/components/homepage/testimonials';
import UnlockCareer from '@/components/homepage/unlock-career';
import { Fragment } from 'react';

export default function Home() {

  return (
    <Fragment>
      <HeroSection />
      <GainExperience />
      <Statistics />
      <SkillsCovered />
      <Challenges />
      <ParticipationBenefits />
      <TestimonialSection />
      <GetStarted />
      <UnlockCareer />
    </Fragment>
  );
}
