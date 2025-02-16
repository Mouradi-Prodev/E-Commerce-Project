import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }).trim(),
  price: z.number().min(0.01, { message: "Price must be greater than 0." }),
  description: z.string().max(500, { message: "Max 500 characters allowed." }).optional(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  imageUrl: z.instanceof(File,{message:"Please upload a valid image file"}).optional(),
  active: z.boolean(),
  category: z.string().optional(),
});

export type   FormState =
  | {
      errors?: {
        name?: string[];
        price?: string[];
        description?: string[];
        quantity?: string[];
        imageUrl?: string[];
        active?: string[];
        category?: string[];
      };
      message?: string;
    }
  | undefined;
