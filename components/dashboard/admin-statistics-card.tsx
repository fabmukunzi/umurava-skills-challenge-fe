'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [isBlue, setIsBlue] = useState(true);

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
              className="px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-all"
              onClick={() => setIsBlue(!isBlue)}
              style={{ backgroundColor: isBlue ? '#E7F6EC' : '#FCE7E7' }}
            >
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.42086 1.14645C6.61612 0.951184 6.93271 0.951184 7.12797 1.14645L9.12797 3.14645C9.32323 3.34171 9.32323 3.65829 9.12797 3.85355C8.93271 4.04882 8.61612 4.04882 8.42086 3.85355L7.27441 2.70711V10.5C7.27441 10.7761 7.05056 11 6.77441 11C6.49827 11 6.27441 10.7761 6.27441 10.5V2.70711L5.12797 3.85355C4.93271 4.04882 4.61612 4.04882 4.42086 3.85355C4.2256 3.65829 4.2256 3.34171 4.42086 3.14645L6.42086 1.14645Z"
                  fill={isBlue ? '#2B71F0' : '#FF5C5C'}
                />
              </svg>
              <span
                className={cn(
                  'text-sm font-medium',
                  isBlue ? 'text-[#2B71F0]' : 'text-[#FF5C5C]'
                )}
              >
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
