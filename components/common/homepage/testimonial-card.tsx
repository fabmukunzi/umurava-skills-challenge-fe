import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

const TestimonialCard = () => {
  return (
    <Card className="lg:w-5/6 w-11/12 mx-auto my-10 rounded-2xl 2xl:p-14 md:p-8 p-3">
      <CardContent className="md:px-3 px-0 pb-0">
        <div className="bg-primary rounded-xl h-80 flex justify-center items-center">
          <div className="bg-white rounded-full p-5">
            <Play size={40} />
          </div>
        </div>
        <div className="my-10 flex items-center gap-4">
          <div className="bg-primary h-12 w-fit md:p-10 p-8 rounded-full"></div>
          <div>
            <h1 className="text-xl font-semibold">Manzi Jack</h1>
            <p className="text-primary_grey">Product Designer, Kigali</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
