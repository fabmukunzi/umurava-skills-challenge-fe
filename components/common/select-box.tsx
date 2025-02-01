/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Select from 'react-select';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T;
  label: string;
  options: Option[];
  multi?: boolean;
  placeholder?: string;
  className?: string;
}

const SelectInput = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  multi = false,
  placeholder = 'Select...',
  className,
}: SelectInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }: { field: ControllerRenderProps<T, any> }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              isMulti={multi}
              options={options}
              components={animatedComponents}
              closeMenuOnSelect={!multi}
              placeholder={placeholder}
              className={cn('w-full', className)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: '3rem',
                  borderRadius: '0.375rem',
                  borderColor: '#D1D5DB',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#9CA3AF' },
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '0.5rem 1rem',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  fontSize: '14px',
                  color: 'black',
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: 'gray',
                  padding: '0.5rem',
                }),
              }}
              value={options.filter((option) =>
                multi
                  ? Array.isArray(field.value) &&
                    field.value.includes(option.value)
                  : option.value === field.value
              )}
              onChange={(selected) => {
                if (multi) {
                  field.onChange(
                    selected
                      ? (selected as Option[]).map((opt) => opt.value)
                      : []
                  );
                } else {
                  field.onChange(selected ? (selected as Option).value : '');
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
