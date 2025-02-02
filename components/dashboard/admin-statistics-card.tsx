'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoveUp } from 'lucide-react';

interface AdminStatCardProps {
  title: string;
  number: number;
  icon: React.ReactNode;
  percentage: number;
}

const AdminStatCard = ({
  title,
  number,
  icon,
  percentage,
}: AdminStatCardProps) => {

  return (
    <Card className="w-full border-2 relative border-[#E4E7EC] bg-white rounded-xl p-8">
      <div className="flex justify-end absolute right-0 top-0">
        <Select>
          <SelectTrigger className="w-[120px] border-none outline-none focus:ring-0 focus:border-transparent focus:outline-none focus-visible:ring-0">
            <SelectValue placeholder="This Week" />
          </SelectTrigger>
          <SelectContent className="border-none">
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CardContent className="flex flex-row gap-4 items-center p-0">
        <div className="bg-[#D0E0FC] text-primary flex items-center justify-center h-12 w-12 rounded-full">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-medium text-gray-500">{title}</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">{number}</h1>
            <div
              className="px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer bg-[#E7F6EC]"
            >
              <MoveUp size={15} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStatCard;
