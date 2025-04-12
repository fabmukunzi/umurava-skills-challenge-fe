import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export interface GenericDialogFormProps<T> {
  title?: string;
  triggerLabel: string;
  mode: 'add' | 'edit';
  defaultValues?: T;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: T) => void;
  renderForm: (formData: T, setFormData: (data: T) => void) => React.ReactNode;
  loading: boolean;
}

export function GenericDialogForm<T>({
  title,
  triggerLabel,
  mode,
  defaultValues,
  onSubmit,
  renderForm,
  isOpen,
  setIsOpen,
  loading,
}: GenericDialogFormProps<T>) {
  const [formData, setFormData] = useState<T>(defaultValues ?? ({} as T));

  const handleSubmit = (e: React.FormEvent) => {
    setIsOpen(true);
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button
            variant={mode === 'add' ? 'default' : 'outline'}
            size={mode === 'add' ? 'default' : 'sm'}
          >
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Fill out the form to create a new entry.'
              : 'Modify the fields and save changes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm(formData, setFormData)}
          <div className="flex justify-end">
            <Button loading={loading} type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
