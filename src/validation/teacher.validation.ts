import { z } from "zod";

export const teacherSchema = z.object({
    name: z.string().nonempty("* This field must not be empty!"),
    dateOfBirth: z.date({ required_error: "* This field must not be empty!" }),
    major: z.string().nonempty("* This field must not be empty!"),
    exp: z.number({ invalid_type_error: "* This field must be a number!" }).min(1, "* Experience must be 1 year at least!"),
    email: z.string().email({ message: "* Please enter valid email!" })
        .regex(/^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/, '* Email must have "@fpt.edu.vn" in suffix!')
        .nonempty("* This field must not be empty!"),
});