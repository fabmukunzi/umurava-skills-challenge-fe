import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

const TestimonialCard = () => {
  return (
    <Card className="lg:w-5/6 w-11/12 mx-auto my-10 rounded-2xl p-3 md:p-6">
      <CardContent className="px-0 pb-0">
        <div className="bg-primary rounded-xl h-56 flex justify-center items-center">
          <div className="bg-white rounded-full p-5">
            <Play size={40} />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4 w-full">
          <div className="bg-primary flex-shrink-0 h-10 w-fit p-6 rounded-full"></div>
          <div>
            <h1 className="text-lg font-semibold leading-none">Manzi Jack</h1>
            <p className="text-primary_grey text-base">Product Designer, Kigali</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
