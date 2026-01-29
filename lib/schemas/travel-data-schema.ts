import { z } from 'zod';

export const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

export const locationSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const menuItemSchema = z.object({
  item: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0),
  currency: z.string().min(1, 'Currency is required'),
});

export const hotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  rating: z.number().min(0).max(5).optional(),
  price_range: z.string().optional(),
  tags: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
  location: locationSchema.optional(),
  description: z.string().optional(),
});

export const restaurantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  rating: z.number().min(0).max(5).optional(),
  price_range: z.string().optional(),
  tags: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  contact: contactSchema.optional(),
  location: locationSchema.optional(),
  description: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const gymSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  rating: z.number().min(0).max(5).optional(),
  price_range: z.string().optional(),
  tags: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  location: locationSchema.optional(),
  description: z.string().optional(),
});

export const bankSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().optional(),
  services: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
});

export const atmSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  availability: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const transportOptionSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  providers: z.array(z.string()).optional(),
  description: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  cost: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const shoppingSpotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().optional(),
  area: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
});

export const entertainmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const hospitalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  services: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
});

export const clinicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  services: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
});

export const pharmacySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  area: z.string().optional(),
  open_hours: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
});

export const healthcareSchema = z.object({
  hospitals: z.array(hospitalSchema).optional(),
  clinics: z.array(clinicSchema).optional(),
  pharmacies: z.array(pharmacySchema).optional(),
});

export const financeSchema = z.object({
  banks: z.array(bankSchema).optional(),
  atms: z.array(atmSchema).optional(),
});

export const transportSchema = z.object({
  options: z.array(transportOptionSchema).optional(),
});

export const placesSchema = z.object({
  landmarks: z.array(z.string()).optional(),
  areas: z.array(z.string()).optional(),
  parks: z.array(z.string()).optional(),
});

export const citySchema = z.object({
  city_name: z.string().min(1, 'City name is required'),
  city_images: z.array(z.string().url()).optional(),
  places: placesSchema.optional(),
  hotels: z.array(hotelSchema).optional(),
  restaurants: z.array(restaurantSchema).optional(),
  gyms: z.array(gymSchema).optional(),
  finance: financeSchema.optional(),
  transport: z.union([transportSchema, z.array(z.string())]).optional(), // Handle legacy array of strings or new object
  shopping: z.array(shoppingSpotSchema).optional().or(z.array(z.string())), // Handle legacy
  entertainment: z.array(entertainmentSchema).optional().or(z.array(z.string())), // Handle legacy
  healthcare: healthcareSchema.optional(),
  safety_level: z.string().optional(),
});

export const travelDataFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  country: z.string().min(1, 'Country is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.boolean().default(true),
  cities: z.array(citySchema).default([]),
});

export type TravelDataFormValues = z.infer<typeof travelDataFormSchema>;
