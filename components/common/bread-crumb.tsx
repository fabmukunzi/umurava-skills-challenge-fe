'use client';

import { useRouter } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { MoveLeft, Slash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const { back } = useRouter();

  return (
    <Breadcrumb className={cn('text-black', className)}>
      <BreadcrumbList>
        <BreadcrumbItem className="flex items-center gap-2">
          <Button variant="outline" className="w-8 h-8 border-2" onClick={back}>
            <MoveLeft />
          </Button>
          <h1
            className="text-primary_grey cursor-pointer font-medium md:text-lg"
            onClick={back}
          >
            Go Back
          </h1>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLastItem ? (
                  <span className="text-primary text-base mx-2">
                    {item.label}
                  </span>
                ) : (
                  <BreadcrumbLink
                    className="text-gray-600 hover:text-primary text-base mx-2"
                    href={item.href}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
