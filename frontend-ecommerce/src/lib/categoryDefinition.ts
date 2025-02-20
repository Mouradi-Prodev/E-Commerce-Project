import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }).trim(),
  description: z.string().max(500, { message: "Max 500 characters allowed." }).optional(),
  image_url: z.string().optional(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        image_url?: string[];
      };
      message?: string;
    }
  | undefined;