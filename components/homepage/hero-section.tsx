import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HomeImage } from '@/lib/images';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
