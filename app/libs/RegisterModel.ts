import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8, "At least 8 charactrs"),
    passwordConfirm: z.string().min(8, "At least 8 characters"),
  })
  .superRefine((v, ctx) => {
    if (v.password && v.passwordConfirm && v.password !== v.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Passwords don't match`,
        path: ["passwordConfirm"],
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
