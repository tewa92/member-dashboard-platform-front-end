'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  image: string | null;
  provider: string | null;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.getUsers({ page, page_size: pageSize, search });
      setUsers(response.users);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const columns = [
    {
      key: 'user',
      header: 'User',
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ''} alt={user.full_name || ''} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
              {user.full_name?.[0] || user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{user.full_name || 'No name'}</p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (user: User) => (
        <Badge
          variant="outline"
          className="border-violet-500/30 bg-violet-500/10 text-violet-300"
        >
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'provider',
      header: 'Provider',
      cell: (user: User) => (
        <span className="text-slate-400 capitalize">{user.provider || 'N/A'}</span>
      ),
    },
    {
      key: 'created_at',
      header: 'Joined',
      cell: (user: User) => (
        <span className="text-slate-400">
          {new Date(user.created_at).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 p-2">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Users</h1>
            <p className="text-slate-400">View all registered users (read-only)</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={users}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search users by name or email..."
        loading={loading}
      />
    </div>
  );
}
