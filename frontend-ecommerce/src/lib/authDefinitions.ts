import { z } from 'zod'

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  //     .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  //     .regex(/[0-9]/, { message: 'Contain at least one number.' })
  //     .regex(/[^a-zA-Z0-9]/, {
  //       message: 'Contain at least one special character.',
  //     })
  //     .trim(),
})

export type FormState =
  | {
    errors?: {
      email?: string[],
      password?: string[]
    }
    message?: string
  }
  | undefined


export const SignupFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
  address: z.string().min(1, { message: 'Address is required.' }).trim(),
  city: z.string().min(1, { message: 'City is required.' }).trim(),
  phone: z
    .string()
    .regex(/^[+]{0,1}[0-9\s-]+$/, { message: 'Please enter a valid phone number.' })
    .trim(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type FormStateSignup =
  | {
      errors?: {
        name?: string[],
        email?: string[],
        password?: string[],
        confirmPassword?: string[],
        address?: string[],
        city?: string[],
        phone?: string[]
      },
      message?: string
    }
  | undefined;