import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'invalid email format' })
    .nonempty({ message: 'email is required' }),
  password: z
    .string()
    .min(5, { message: 'password must be atleast 8 char' })
    .nonempty({ message: 'password is required' }),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'name must be atleast 2 char' })
    .nonempty({ message: 'name is required' }),
  email: z
    .string()
    .email({ message: 'invalid email format' })
    .nonempty({ message: 'email is required' }),
  phone: z
    .string()
    .min(11, { message: 'Phone must be 11 char' })
    .max(11, { message: "Phone can't be more that 11 char" })
    .nonempty({ message: 'Phone is required' }),
  password: z
    .string()
    .min(8, { message: 'password must be atleast 8 char' })
    .nonempty({ message: 'password is required' }),
  rePassword: z
    .string()
    .min(8, { message: 'rePassword must be atleast 8 char' })
    .nonempty({ message: 'rePassword is required' }),
});
