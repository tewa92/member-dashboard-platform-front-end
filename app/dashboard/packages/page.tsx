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
import { Package, Plus, Pencil, Trash2 } from 'lucide-react';

interface PackageItem {
  id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  package_type: string;
  price: number;
  currency: string;
  discount_percent: number;
  status: boolean;
  created_at: string;
}

export default function PackagesPage() {
  const router = useRouter();
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PackageItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const pageSize = 10;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.getPackages({ page, page_size: pageSize, search });
      setItems(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
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
      await api.deletePackage(itemToDelete.id);
      fetchItems();
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleting(false);
    }
  };

  const formatPrice = (price: number, currency: string, discount: number) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
    
    if (discount > 0) {
      return (
        <div>
          <span className="text-white">{formattedPrice}</span>
          <Badge className="ml-2 bg-emerald-500/20 text-emerald-300 border-0">
            -{discount}%
          </Badge>
        </div>
      );
    }
    return <span className="text-white">{formattedPrice}</span>;
  };

  const columns = [
    {
      key: 'title',
      header: 'Package',
      cell: (item: PackageItem) => (
        <div>
          <p className="font-medium text-white">{item.title}</p>
          <p className="text-sm text-slate-400">{item.city}, {item.country}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (item: PackageItem) => (
        <Badge
          variant="outline"
          className="border-orange-500/30 bg-orange-500/10 text-orange-300"
        >
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'package_type',
      header: 'Type',
      cell: (item: PackageItem) => (
        <span className="text-slate-300">{item.package_type}</span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      cell: (item: PackageItem) => formatPrice(item.price, item.currency, item.discount_percent),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: PackageItem) => (
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
  ];

  const renderActions = (item: PackageItem) => (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/dashboard/packages/${item.id}`)}
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
          <div className="rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 p-2">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Packages</h1>
            <p className="text-slate-400">Manage travel packages</p>
          </div>
        </div>
        <Button
          onClick={() => router.push('/dashboard/packages/new')}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Package
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
        searchPlaceholder="Search packages..."
        loading={loading}
        actions={renderActions}
      />

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="border-white/10 bg-slate-900">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Package</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
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
