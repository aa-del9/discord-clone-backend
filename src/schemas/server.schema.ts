import { z } from "zod";

export const serverSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be at least 4 characters.")
        .max(24, "Maximum length of Name is 24 characters."),
    imageUrl: z.optional(z.string().trim().url()),
    inviteCode: z.optional(z.string()),
    creator: z.optional(z.string()),
});
