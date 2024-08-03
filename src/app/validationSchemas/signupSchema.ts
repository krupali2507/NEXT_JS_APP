import { z } from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password length must be at least 8!" })
    .max(20, { message: "Password length Not greater than 20!" }),
});
