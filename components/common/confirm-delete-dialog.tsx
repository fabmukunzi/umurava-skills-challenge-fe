import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  setIsOpen,
  onConfirm,
  title = 'Are you sure?',
  loading = false,
  message = 'This action cannot be undone.',
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            loading={loading}
            variant="destructive"
            onClick={() => {
              onConfirm();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
