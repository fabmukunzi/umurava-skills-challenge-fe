/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
  className?:string;
}

const TextInput = <T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  className
}: TextInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }: { field: ControllerRenderProps<T, any> }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className={`h-12 w-full ${className}`}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
