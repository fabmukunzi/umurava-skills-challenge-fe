import { Card } from '@/components/ui/card';
import { FC } from 'react';
import SVGIcon from '@/components/common/svg';
import FlatPaperIcon from '@/components/common/svg/flatpaper-icon';

interface CardProps {
  title: string;
  value: string;
  isFirst: boolean;
}

const TalentStatisticsCard: FC<CardProps> = ({ title, value, isFirst }) => {
  return (
    <Card className={`p-6 flex-1 rounded-lg ${isFirst ? 'bg-primary' : 'bg-white'} `}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className={`rounded-lg ${isFirst ? 'bg-white' : 'bg-primary'} p-[0.2rem]`}></div>
          <div>
            <p className={`${isFirst ? 'text-white' : ''}`}>{title}</p>
            <p className={`text-xl font-bold ${isFirst ? 'text-white' : 'text-[#2e2e2e]'}`}>{value}</p>
          </div>
        </div>
        <div className="bg-[#D0E0FC] text-primary flex items-center justify-center h-12 w-12 rounded-full">
          <SVGIcon Icon={FlatPaperIcon} height={20} width={20} />
        </div>
      </div>
    </Card>
  );
};

export default TalentStatisticsCard;
