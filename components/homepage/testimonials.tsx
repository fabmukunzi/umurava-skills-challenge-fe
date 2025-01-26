import Carousel from '@/components/common/carousel';
import TestimonialCard from '@/components/common/testimonial-card';
import { EmblaOptionsType } from 'embla-carousel';

const TestimonialSection = () => {
  const slides = Array(4)
    .fill(null)
    .map((testmon, index) => <TestimonialCard key={index} />);

  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <div className="mx-auto text-black py-10 md:w-5/6">
      <div className="md:w-1/2 text-center">
        <h1 className="2xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold">
          Users are in Love with Skills Challenges Program
        </h1>
        <p className="my-4 text-primary_grey text-lg">
          See what our clients say about working with us. Their success speaks
          for our dedication and expertise.
        </p>
      </div>
      <Carousel slides={slides} options={OPTIONS} />
    </div>
  );
};

export default TestimonialSection;
