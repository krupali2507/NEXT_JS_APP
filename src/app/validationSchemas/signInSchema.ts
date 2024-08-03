import { z } from "zod";

export const signInSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "Password length must be at least 8!" })
    .max(20, { message: "Password length Not greater than 20!" }),
});
