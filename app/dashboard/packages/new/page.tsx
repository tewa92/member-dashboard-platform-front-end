'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

export default function NewPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    package_type: '',
    country: '',
    city: '',
    price: '',
    currency: 'USD',
    discount_percent: '0',
    duration_days: '',
    max_people: '',
    included_items: '',
    status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const itemsList = formData.included_items.split(',').map((i) => i.trim()).filter(Boolean);
      await api.createPackage({
        ...formData,
        price: parseFloat(formData.price),
        discount_percent: parseFloat(formData.discount_percent) || 0,
        duration_days: formData.duration_days ? parseInt(formData.duration_days) : null,
        max_people: formData.max_people ? parseInt(formData.max_people) : null,
        included_items: { list: itemsList },
      });
      router.push('/dashboard/packages');
    } catch (error) {
      console.error('Failed to create package:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Package</h1>
          <p className="text-slate-400">Create a new travel package</p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Package Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Safari Adventure"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package_type" className="text-slate-300">Package Type</Label>
                <Input
                  id="package_type"
                  value={formData.package_type}
                  onChange={(e) => setFormData({ ...formData, package_type: e.target.value })}
                  placeholder="e.g., Standard, Premium"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-slate-300">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., Kenya"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-slate-300">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Nairobi"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Safari, Beach"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-300">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-slate-300">Currency</Label>
                <Input
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="USD"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount_percent" className="text-slate-300">Discount %</Label>
                <Input
                  id="discount_percent"
                  type="number"
                  value={formData.discount_percent}
                  onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                  placeholder="0"
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration_days" className="text-slate-300">Duration (days)</Label>
                <Input
                  id="duration_days"
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                  placeholder="e.g., 7"
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the package..."
                required
                rows={4}
                className="border-white/10 bg-slate-900/50 text-white resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="included_items" className="text-slate-300">Included Items (comma-separated)</Label>
              <Input
                id="included_items"
                value={formData.included_items}
                onChange={(e) => setFormData({ ...formData, included_items: e.target.value })}
                placeholder="e.g., Airport transfer, Accommodation, Meals"
                required
                className="border-white/10 bg-slate-900/50 text-white"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-white/10 bg-transparent text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
