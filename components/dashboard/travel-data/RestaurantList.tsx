import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { TravelDataFormValues } from "@/lib/schemas/travel-data-schema";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GenericStringList } from "./GenericStringList";

interface RestaurantListProps {
  cityIndex: number;
  control: Control<TravelDataFormValues>;
  register: UseFormRegister<TravelDataFormValues>;
  errors: FieldErrors<TravelDataFormValues>;
}

export function RestaurantList({ cityIndex, control, register, errors }: RestaurantListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `cities.${cityIndex}.restaurants`,
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className="text-sm font-semibold text-orange-400">Restaurants</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            append({
              name: "",
              area: "",
              images: [],
              rating: 0,
              price_range: "",
              tags: [],
              amenities: [],
              description: "",
              contact: { phone: "", email: "", website: "" },
              location: { lat: 0, lng: 0 },
              menu: [] // Initialize empty menu
            });
            setExpandedIndex(fields.length);
          }}
          className="h-7 px-2 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
        >
          <Plus className="mr-1 h-3 w-3" /> Add Restaurant
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-white/5 bg-slate-950/30 overflow-hidden">
            <div 
              className="flex items-center justify-between p-3 bg-slate-900/50 cursor-pointer hover:bg-slate-900/80 transition-colors"
              onClick={() => toggleExpand(index)}
            >
              <span className="text-sm font-medium text-white truncate">
                Restaurant #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                {expandedIndex === index ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </div>
            </div>

            {expandedIndex === index && (
              <div className="p-4 space-y-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Name</Label>
                    <Input
                      {...register(`cities.${cityIndex}.restaurants.${index}.name`)}
                      className="h-8 bg-slate-950 border-white/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Area</Label>
                    <Input
                      {...register(`cities.${cityIndex}.restaurants.${index}.area`)}
                      className="h-8 bg-slate-950 border-white/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Rating (0-5)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register(`cities.${cityIndex}.restaurants.${index}.rating`, { valueAsNumber: true })}
                      className="h-8 bg-slate-950 border-white/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-slate-400">Price Range</Label>
                    <Input
                      {...register(`cities.${cityIndex}.restaurants.${index}.price_range`)}
                      className="h-8 bg-slate-950 border-white/10"
                      placeholder="e.g. Mid, High"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-slate-400">Description</Label>
                  <Textarea
                    {...register(`cities.${cityIndex}.restaurants.${index}.description`)}
                    className="bg-slate-950 border-white/10 resize-none"
                    rows={2}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                   <GenericStringList 
                      control={control} 
                      register={register} 
                      name={`cities.${cityIndex}.restaurants.${index}.tags`} 
                      label="Tags" 
                   />
                   <GenericStringList 
                      control={control} 
                      register={register} 
                      name={`cities.${cityIndex}.restaurants.${index}.amenities`} 
                      label="Amenities" 
                   />
                </div>
                
                {/* Simplified Menu - Could be another nested component if very complex */}
                <div className="p-3 bg-black/20 rounded border border-white/5">
                    <Label className="text-xs font-semibold text-slate-300 mb-2 block">Menu Preview (JSON)</Label>
                    <p className="text-xs text-slate-500">Menu items CRUD will be implemented in future update</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
