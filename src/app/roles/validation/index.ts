import { Policy, Role } from "@prisma/client";
import { z } from "zod";

const postSchema = z
  .object({
    role: z.enum([Role.ADMIN, Role.USER, Role.ROBOT], {
      message: "選択してください。",
    }),
    policy: z.enum([Policy.READ_ONLY, Policy.READ_WRITE]).optional(),
  })
  .refine(
    ({ role, policy }) => {
      return role !== Role.ADMIN || policy;
    },
    {
      message: "選択してください。",
      path: ["policy"],
    }
  );

type PostSchema = z.infer<typeof postSchema>;

export { postSchema, type PostSchema };
