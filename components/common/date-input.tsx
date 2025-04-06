/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useController } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface DateInputProps {
  label: string;
  name: string;
  form: any;
  placeHolder?: string;
  disablePast?: boolean;
  disableBeforeDate?: Date;
}

const DateInput = ({
  label,
  name,
  form,
  placeHolder,
  disablePast = false,
  disableBeforeDate,
}: DateInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
  });

  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full h-12 justify-start text-left font-normal',
                error ? 'border-red-500' : 'border-gray-300'
              )}
              {...field}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                dayjs(field.value).format('DD-MM-YYYY')
              ) : (
                <span>{placeHolder || 'Pick a date'}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) => field.onChange(date)}
              initialFocus
              disabled={(date) => {
                if (disablePast && date < new Date()) return true;
                if (disableBeforeDate && date < disableBeforeDate) return true;
                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>

      {error && (
        <p className="text-red-500 font-medium text-sm mt-1">{error.message}</p>
      )}
    </FormItem>
  );
};

export { DateInput };
