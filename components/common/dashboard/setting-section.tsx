'use client';

import { useState } from 'react';
import { handleError } from '@/lib/errorHandler';
import {
  IChallengeCategory,
  IPrizeCategory,
  ISectionProps,
  ISkill,
} from '@/lib/types/setting';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GenericDialogForm } from './generic-dialog-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '../confirm-delete-dialog';
import { Column, DataTable } from './data-table';

export const Section = ({
  title,
  items,
  onAdd,
  onDelete,
  onUpdate,
  isOpen,
  setIsOpen,
  isEditOpen,
  setIsEditOpen,
  confirmOpen,
  setConfirmOpen,
  isAddLoading = false,
  isUpdateLoading = false,
  isDeleteLoading = false,
  placeholder = 'Enter name',
}: ISectionProps) => {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editCurrency, setEditCurrency] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const isPrizeSection = title?.toLowerCase().includes('prize');

  const handleAdd = () => {
    if (!value.trim()) {
      toast({
        title: 'Validation',
        description: 'Name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    try {
      onAdd(value.trim(), isPrizeSection ? currency : undefined);
      if (!isOpen) {
        setValue('');
        setCurrency('');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdate = () => {
    if (!editValue.trim()) {
      toast({
        title: 'Validation',
        description: 'Updated value cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    if (editId) {
      try {
        onUpdate(
          editId,
          editValue.trim(),
          isPrizeSection ? editCurrency : undefined
        );
        resetEditState();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const resetEditState = () => {
    if (!isEditOpen) {
      setEditId(null);
      setEditValue('');
      setEditCurrency('');
    }
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      try {
        onDelete(confirmDeleteId);
        setConfirmDeleteId(null);
      } catch (error) {
        handleError(error);
      }
    }
  };

  type TableItem = ISkill | IChallengeCategory | IPrizeCategory;

  const columns: Column<TableItem>[] = [
    {
      header: '#',
      render: (_item: TableItem, index: number) => index + 1,
    },
    {
      header: 'Name',
      render: (item: TableItem) =>
        'skillName' in item
          ? item.skillName
          : 'challengeCategoryName' in item
            ? item.challengeCategoryName
            : item.prizeName,
    },
    isPrizeSection
      ? {
        header: 'Currency',
        render: (item: TableItem) =>
          'currency' in item ? item.currency ?? 'N/A' : 'N/A',
      }
      : null,
    {
      header: 'Created At',
      render: (item: TableItem) =>
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    },
    {
      header: 'Actions',
      render: (item: TableItem) => {
        const id = item._id;
        const name =
          'skillName' in item
            ? item.skillName
            : 'challengeCategoryName' in item
              ? item.challengeCategoryName
              : item.prizeName;

        return (
          <div className="flex text-right space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setEditId(id || '');
                setEditValue(name);
                if ('currency' in item) {
                  setEditCurrency(item.currency ?? '');
                }
                setIsEditOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600"
              onClick={() => {
                setConfirmDeleteId(id || '');
                setConfirmOpen(true);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ].filter(Boolean) as Column<TableItem>[];

  return (
    <Card className="mt-6 max-sm:!w-[360px] md:w-full overflow-x-auto">
      <CardHeader className="max-w-sm:items-center justify-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex justify-end mt-2">
          <GenericDialogForm
            title={`Add ${title}`}
            triggerLabel="Add"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            mode="add"
            onSubmit={handleAdd}
            loading={isAddLoading}
            renderForm={() => (
              <div className="space-y-4">
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                />
                {isPrizeSection && (
                  <Input
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder="Currency"
                  />
                )}
              </div>
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="max-w-sm:p-0 md:p-[auto]">
        <DataTable data={items} columns={columns} />
      </CardContent>

      <GenericDialogForm
        title={`Edit ${title}`}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        triggerLabel=""
        mode="edit"
        onSubmit={handleUpdate}
        loading={isUpdateLoading}
        renderForm={() => (
          <div className="space-y-4">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={placeholder}
            />
            {isPrizeSection && (
              <Input
                value={editCurrency}
                onChange={(e) => setEditCurrency(e.target.value)}
                placeholder="Currency"
              />
            )}
          </div>
        )}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        setIsOpen={setConfirmOpen}
        loading={isDeleteLoading}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};
