import React, { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IAdvert } from '@/lib/types/project';
import { ArrowRight } from 'lucide-react';

const AdvertCard: FC<{ advert: IAdvert }> = ({ advert }) => {
  return (
    <Card className="lg:p-10 p-5 rounded-2xl bg-secondary_bg text-black">
      <CardContent className="sm:flex lg:gap-32 gap-4 max-sm:px-0 justify-between items-center pb-0">
        <div className="lg:-mt-10">
          <div className="bg-white w-fit p-6 rounded-xl">
            <Image
              width={40}
              height={40}
              src={advert.logo}
              alt="advert image"
            />
          </div>
          <p className="lg:my-10 my-4 lg:text-lg text-primary_grey font-light">
            {advert.content}
          </p>
          <Link
            className="text-primary font-medium flex gap-4 items-center group"
            href="/challenges"
          >
            Learn More
            <Button className="text-white h-8 w-8 p-1 rounded-full font-semibold group-hover:translate-x-3 transition-all duration-500">
              <ArrowRight className="group-hover:-rotate-45 transition-all duration-500" />
            </Button>
          </Link>
        </div>
        <div className="my-10">
          <Image
            width={1500}
            height={500}
            src={advert.otherImage}
            alt="advert image"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvertCard;
