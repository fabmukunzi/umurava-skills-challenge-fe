'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChallengePagination } from '@/lib/types/project';

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (item: T, index?: number) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  pagination?: ChallengePagination;
  loading?: boolean;
  columns: Column<T>[];
  onPageChange: (page: number) => void;
}

export function DataTable<T>({
  data,
  pagination,
  loading = false,
  columns,
  onPageChange,
}: DataTableProps<T>) {

  console.log(pagination, 'pagination');
  return (
    <div className="w-full space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: pagination?.pageSize||0 }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {columns.map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : data?.map((item, rowIdx) => (
                <TableRow key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <TableCell key={colIdx}>
                      {col.render
                        ? col.render(item, rowIdx)
                        : (item[col.accessor as keyof T] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex justify-end items-center space-x-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            disabled={pagination?.currentPage <= 1}
            onClick={() => onPageChange(pagination?.currentPage - 1)}
          >
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={pagination?.currentPage >= pagination?.totalPages}
            onClick={() => onPageChange(pagination?.currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
