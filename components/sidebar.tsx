'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Globe,
  Package,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Travel Data', href: '/dashboard/traveldata', icon: Globe },
  { name: 'Packages', href: '/dashboard/packages', icon: Package },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
            Dashboard
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <ChevronLeft
            className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white shadow-lg shadow-violet-500/10'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-colors',
                  isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-400 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-0"
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
            Dashboard
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive ? 'text-violet-400' : 'text-slate-500'
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
