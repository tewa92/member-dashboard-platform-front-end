'use client';

import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Globe, Package, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Users',
    value: '—',
    icon: Users,
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    name: 'Travel Destinations',
    value: '—',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'Active Packages',
    value: '—',
    icon: Package,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    name: 'Growth',
    value: '—',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/10 to-amber-500/10',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-purple-600/20 p-8 backdrop-blur-sm border border-white/10">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.full_name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="mt-2 text-slate-300">
            Here's an overview of your dashboard activity.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.name}
              </CardTitle>
              <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-2`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Your recent dashboard activity will appear here.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-slate-400">
              • Add new travel destination
            </p>
            <p className="text-sm text-slate-400">
              • Create new package
            </p>
            <p className="text-sm text-slate-400">
              • View all users
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-emerald-400">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
