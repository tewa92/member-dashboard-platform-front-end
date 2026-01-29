import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { TravelDataFormValues } from "@/lib/schemas/travel-data-schema";
import { CityItem } from "./CityItem";

interface CityListProps {
  control: Control<TravelDataFormValues>;
  register: UseFormRegister<TravelDataFormValues>;
  errors: FieldErrors<TravelDataFormValues>;
}

export function CityList({ control, register, errors }: CityListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Cities</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              city_name: "",
              city_images: [],
              places: { landmarks: [], areas: [], parks: [] },
              hotels: [],
              restaurants: [],
              gyms: [],
              finance: { banks: [], atms: [] },
              transport: { options: [] },
              shopping: [],
              entertainment: [],
              healthcare: { hospitals: [], clinics: [], pharmacies: [] },
              safety_level: "medium",
            })
          }
          className="border-white/10 text-white hover:bg-white/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add City
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="relative">
          <CityItem
            index={index}
            control={control}
            register={register}
            errors={errors}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-red-400 hover:bg-red-900/20 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
