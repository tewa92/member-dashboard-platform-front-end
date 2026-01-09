'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Globe, Plus, Pencil, Trash2 } from 'lucide-react';

interface TravelData {
  id: string;
  name: string;
  country: string;
  category: string;
  description: string;
  cities: any;
  images: string[] | null;
  status: boolean;
  created_at: string;
}

export default function TravelDataPage() {
  const router = useRouter();
  const [items, setItems] = useState<TravelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TravelData | null>(null);
  const [deleting, setDeleting] = useState(false);
  const pageSize = 10;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.getTravelData({ page, page_size: pageSize, search });
      setItems(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch travel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, search]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await api.deleteTravelData(itemToDelete.id);
      fetchItems();
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (item: TravelData) => (
        <div>
          <p className="font-medium text-white">{item.name}</p>
          <p className="text-sm text-slate-400 line-clamp-1">{item.description}</p>
        </div>
      ),
    },
    {
      key: 'country',
      header: 'Country',
      cell: (item: TravelData) => <span className="text-slate-300">{item.country}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      cell: (item: TravelData) => (
        <Badge
          variant="outline"
          className="border-blue-500/30 bg-blue-500/10 text-blue-300"
        >
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: TravelData) => (
        <Badge
          variant="outline"
          className={
            item.status
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }
        >
          {item.status ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Created',
      cell: (item: TravelData) => (
        <span className="text-slate-400">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const renderActions = (item: TravelData) => (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/dashboard/traveldata/${item.id}`)}
        className="text-slate-400 hover:text-white hover:bg-white/10"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setItemToDelete(item);
          setDeleteDialogOpen(true);
        }}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Travel Data</h1>
            <p className="text-slate-400">Manage travel destinations</p>
          </div>
        </div>
        <Button
          onClick={() => router.push('/dashboard/traveldata/new')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={items}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search travel data..."
        loading={loading}
        actions={renderActions}
      />

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="border-white/10 bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Travel Data</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-white/10 bg-transparent text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
