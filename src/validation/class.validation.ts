import { z } from "zod";

export const classSchema = z.object({
    name: z.string().nonempty("* This field must not be empty!"),
    major: z.string().nonempty("* This field must not be empty!"),
    teacher: z.string().nonempty("* This field must not be empty!"),
});