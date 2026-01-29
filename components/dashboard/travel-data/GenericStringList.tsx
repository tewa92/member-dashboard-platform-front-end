import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

// Helper type to make the component generic enough for any string array path
interface GenericStringListProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  label: string;
}

export function GenericStringList({ control, register, name, label }: GenericStringListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => append("")}
          className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
        >
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...register(`${name}.${index}`)}
              className="h-8 border-white/10 bg-slate-950/50 text-white text-sm"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-slate-500 hover:text-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-xs text-slate-600 italic">No {label.toLowerCase()} added.</p>
        )}
      </div>
    </div>
  );
}
