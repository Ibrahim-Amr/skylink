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
