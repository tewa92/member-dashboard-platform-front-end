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

export default function NewTravelDataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    category: '',
    description: '',
    cities: '',
    status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const citiesArray = formData.cities.split(',').map((c) => c.trim()).filter(Boolean);
      await api.createTravelData({
        ...formData,
        cities: { list: citiesArray },
      });
      router.push('/dashboard/traveldata');
    } catch (error) {
      console.error('Failed to create travel data:', error);
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
          <h1 className="text-2xl font-bold text-white">Add New Destination</h1>
          <p className="text-slate-400">Create a new travel destination</p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Destination Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Maasai Mara"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
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
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Safari, Beach, Adventure"
                  required
                  className="border-white/10 bg-slate-900/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cities" className="text-slate-300">Cities (comma-separated)</Label>
                <Input
                  id="cities"
                  value={formData.cities}
                  onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
                  placeholder="e.g., Nairobi, Mombasa"
                  required
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
                placeholder="Describe the destination..."
                required
                rows={4}
                className="border-white/10 bg-slate-900/50 text-white resize-none"
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
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Destination
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
