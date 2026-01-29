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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { travelDataFormSchema, TravelDataFormValues } from '@/lib/schemas/travel-data-schema';
import { CityList } from '@/components/dashboard/travel-data/CityList';

export default function NewTravelDataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelDataFormValues>({
    resolver: zodResolver(travelDataFormSchema),
    defaultValues: {
      name: '',
      country: '',
      category: '',
      description: '',
      status: true,
      cities: [],
    },
  });

  const onSubmit = async (data: TravelDataFormValues) => {
    setLoading(true);
    try {
      // The data structure now exactly matches what the API expects thanks to the schema
      await api.createTravelData(data);
      router.push('/dashboard/traveldata');
    } catch (error) {
      console.error('Failed to create travel data:', error);
      // You might want to add a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
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
          <p className="text-slate-400">Create a new travel destination with full details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Main Details */}
        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Destination Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="e.g., Ethiopia"
                  className="border-white/10 bg-slate-900/50 text-white"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-slate-300">Country</Label>
                <Input
                  id="country"
                  {...register('country')}
                  placeholder="e.g., Ethiopia"
                  className="border-white/10 bg-slate-900/50 text-white"
                />
                {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">Category</Label>
                <Input
                  id="category"
                  {...register('category')}
                  placeholder="e.g., Cultural, Adventure"
                  className="border-white/10 bg-slate-900/50 text-white"
                />
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe the destination..."
                rows={4}
                className="border-white/10 bg-slate-900/50 text-white resize-none"
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Cities Form */}
        <CityList control={control} register={register} errors={errors} />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 sticky bottom-6 bg-slate-950/80 p-4 border border-white/10 rounded-lg backdrop-blur-md">
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
            Save Complete Destination
          </Button>
        </div>
      </form>
    </div>
  );
}
