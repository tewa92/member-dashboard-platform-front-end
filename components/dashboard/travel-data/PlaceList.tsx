import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { TravelDataFormValues } from "@/lib/schemas/travel-data-schema";
import { useState } from "react";

// Generic component for simpler place lists (ATMs, Banks, Shopping, etc)
// Can be customized via props
interface PlaceListProps {
  cityIndex: number;
  control: Control<TravelDataFormValues>;
  register: UseFormRegister<TravelDataFormValues>;
  name: any; // Path to the array in schema
  label: string;
  colorClass?: string;
  defaultValues?: any;
}

export function PlaceList({ 
  cityIndex, control, register, name, label, 
  colorClass = "text-blue-400",
  defaultValues = { name: "", area: "", description: "" }
}: PlaceListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h4 className={`text-sm font-semibold ${colorClass}`}>{label}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            append(defaultValues);
            setExpandedIndex(fields.length);
          }}
          className={`h-7 px-2 text-xs ${colorClass} hover:bg-white/5`}
        >
          <Plus className="mr-1 h-3 w-3" /> Add {label.slice(0, -1)}
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-2 items-center">
             <div className="col-span-5">
                <Input
                  {...(register(`${name}.${index}.name` as any))}
                  placeholder="Name"
                  className="h-8 bg-slate-950/50 border-white/10 text-xs"
                />
             </div>
             <div className="col-span-6">
                <Input
                  {...(register(`${name}.${index}.area` as any))}
                  placeholder="Area / Description"
                  className="h-8 bg-slate-950/50 border-white/10 text-xs"
                />
             </div>
             <div className="col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-500 hover:text-red-400"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
             </div>
          </div>
        ))}
        {fields.length === 0 && (
            <p className="text-xs text-slate-600 italic">No {label.toLowerCase()} added yet.</p>
        )}
      </div>
    </div>
  );
}
