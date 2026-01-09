'use client';

import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MobileSidebar } from './sidebar';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  const initials = user?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <h1 className="hidden text-lg font-semibold text-white md:block">
          Member Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full ring-2 ring-violet-500/20 transition-all hover:ring-violet-500/40"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image || ''} alt={user?.full_name || ''} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-white/10 bg-slate-900"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">{user?.full_name || 'User'}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-slate-300 focus:bg-white/5 focus:text-white">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={logout}
              className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
