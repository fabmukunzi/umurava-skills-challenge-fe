import { Card } from '@/components/ui/card';
import { SquareMenu } from 'lucide-react';
import { FC } from 'react';

interface CardProps {
  title: string;
  value: string;
}

const TalentStatisticsCard: FC<CardProps> = ({ title, value }) => {
  return (
    <Card className="p-6 flex-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="rounded-lg bg-primary p-[0.2rem]"></div>
          <div>
            <p>{title}</p>
            <p className="text-xl font-bold text-[#2e2e2e]">{value}</p>
          </div>
        </div>
        <div className="bg-primary/20 text-primary flex items-center justify-center h-12 w-12 rounded-full">
          <SquareMenu size={20} />
        </div>
      </div>
    </Card>
  );
};

export default TalentStatisticsCard;
