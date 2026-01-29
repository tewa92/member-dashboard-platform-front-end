import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { TravelDataFormValues } from "@/lib/schemas/travel-data-schema";
import { HotelList } from "./HotelList";
import { RestaurantList } from "./RestaurantList";
import { GymList } from "./GymList";
import { PlaceList } from "./PlaceList"; // For simpler lists like ATMs
import { GenericStringList } from "./GenericStringList"; // For simple string arrays

interface CityItemProps {
  index: number;
  control: Control<TravelDataFormValues>;
  register: UseFormRegister<TravelDataFormValues>;
  errors: FieldErrors<TravelDataFormValues>;
}

export function CityItem({ index, control, register, errors }: CityItemProps) {
  return (
    <Card className="mb-6 border-white/10 bg-slate-900/50">
      <CardHeader>
        <CardTitle className="text-base text-white">City #{index + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-slate-300">City Name</Label>
            <Input
              {...register(`cities.${index}.city_name`)}
              className="border-white/10 bg-slate-950/50 text-white"
              placeholder="e.g. Addis Ababa"
            />
            {errors.cities?.[index]?.city_name && (
              <p className="text-xs text-red-400">{errors.cities[index]?.city_name?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Safety Level</Label>
            <Input
              {...register(`cities.${index}.safety_level`)}
              className="border-white/10 bg-slate-950/50 text-white"
              placeholder="e.g. Medium"
            />
          </div>
        </div>

        {/* Sub-sections */}
        <div className="space-y-8 pl-4 border-l-2 border-white/5">
          <GenericStringList
            control={control}
            register={register}
            name={`cities.${index}.places.landmarks` as const}
            label="Landmarks"
          />
          <GenericStringList
            control={control}
            register={register}
            name={`cities.${index}.places.areas` as const}
            label="Key Areas"
          />
           <GenericStringList
            control={control}
            register={register}
            name={`cities.${index}.places.parks` as const}
            label="Parks"
          />

          <HotelList cityIndex={index} control={control} register={register} errors={errors} />
          <RestaurantList cityIndex={index} control={control} register={register} errors={errors} />
          <GymList cityIndex={index} control={control} register={register} errors={errors} />
          
          <div className="grid gap-6 md:grid-cols-2">
             <div className="space-y-4">
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.finance.banks`} 
                    label="Banks" 
                    colorClass="text-green-400"
                />
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.finance.atms`} 
                    label="ATMs" 
                    colorClass="text-green-400"
                />
             </div>
             <div className="space-y-4">
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.shopping`} 
                    label="Shopping" 
                    colorClass="text-pink-400"
                />
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.entertainment`} 
                    label="Entertainment" 
                    colorClass="text-purple-400"
                />
             </div>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-4">
             <Label className="text-sm font-semibold text-cyan-400">Healthcare</Label>
             <div className="grid gap-6 md:grid-cols-3">
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.healthcare.hospitals`} 
                    label="Hospitals" 
                    colorClass="text-cyan-400"
                />
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.healthcare.clinics`} 
                    label="Clinics" 
                    colorClass="text-cyan-400"
                />
                <PlaceList 
                    cityIndex={index} 
                    control={control} 
                    register={register} 
                    name={`cities.${index}.healthcare.pharmacies`} 
                    label="Pharmacies" 
                    colorClass="text-cyan-400"
                />
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
