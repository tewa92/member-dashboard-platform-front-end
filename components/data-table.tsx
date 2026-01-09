'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  total,
  page,
  pageSize,
  onPageChange,
  onSearch,
  searchPlaceholder = 'Search...',
  loading = false,
  actions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      {onSearch && (
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 border-white/10 bg-slate-900/50 text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Search
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-white/10 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="text-slate-300 font-semibold"
                >
                  {column.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="text-slate-300 font-semibold text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-violet-500" />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center text-slate-400"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-white/10 hover:bg-white/5 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="text-slate-300">
                      {column.cell
                        ? column.cell(item)
                        : (item as any)[column.key]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-right">
                      {actions(item)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {(page - 1) * pageSize + 1} to{' '}
          {Math.min(page * pageSize, total)} of {total} results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-300">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
