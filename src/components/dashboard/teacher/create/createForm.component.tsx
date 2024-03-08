"use client";

import * as React from "react";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createAction from "@/actions/create.action";
import { teacherSchema } from "@/validation/teacher.validation";
import { getAllCache } from "@/caches/getAll.cache";

interface IMajor {
    _id: string;
    name: string;
}

export default function CreateTeacherForm({ handleClose }: { handleClose: () => void }) {
    const [majors, setMajors] = React.useState<IMajor[]>([]);
    const [formState, setFormState] = React.useState({
        name: "",
        dateOfBirth: format(new Date(2000, 2, 28), "yyyy-MM-dd"),
        major: "",
        exp: 1,
        email: "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
        dateOfBirth: "",
        major: "",
        exp: "",
        email: "",
    });

    React.useEffect(() => {
        const fetchCache = async () => {
            const res = await getAllCache("major");
            if (res.data) setMajors(res.data);
        };

        fetchCache();
    }, []);

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = teacherSchema.safeParse({
            [name]:
                name === "dateOfBirth"
                    ? new Date(value)
                    : name === "exp"
                    ? Number(value)
                    : value,
        });

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            const fieldErrors = zodErrors[name as keyof typeof zodErrors];
            setErrors({
                ...errors,
                [name]: fieldErrors && fieldErrors[0],
            });
        } else {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setErrors({
            ...errors,
            [name]: "",
        });
        setFormState({ ...formState, [name]: value });
    };

    const onSubmit = async (formData: FormData) => {
        const exp = Number(formData.get("exp"));
        const data = {
            name: formData.get("name"),
            dateOfBirth: new Date(String(formData.get("dateOfBirth"))),
            major: formData.get("major"),
            exp: exp,
            email: formData.get("email"),
        };

        const validatedFields = teacherSchema.safeParse(data);

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            setErrors({
                name: zodErrors.name ? zodErrors.name[0] : "",
                dateOfBirth: zodErrors.dateOfBirth ? zodErrors.dateOfBirth[0] : "",
                major: zodErrors.major ? zodErrors.major[0] : "",
                exp: zodErrors.exp ? zodErrors.exp[0] : "",
                email: zodErrors.email ? zodErrors.email[0] : "",
            });
        } else {
            const res = await createAction("teacher", data);
            if (res.status) {
                toast.success("Creating new teacher successfully!");
                handleClose();
            } else {
                Array.isArray(res.message)
                    ? toast.error(res?.message[0])
                    : toast.error(res.message);
            }
        }
    };

    return (
        <form action={onSubmit}>
            <Stack spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <Box width={"50%"}>
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            value={formState.name}
                            margin="normal"
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Date of birth"
                            type="date"
                            name="dateOfBirth"
                            value={formState.dateOfBirth}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.dateOfBirth ? true : false}
                            helperText={errors.dateOfBirth}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            name="exp"
                            label="Experience"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={formState.exp}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.exp ? true : false}
                            helperText={errors.exp}
                        />
                    </Box>
                    <Box width={"50%"}>
                        <TextField
                            name="major"
                            label="Major"
                            select
                            fullWidth
                            margin="normal"
                            value={formState.major}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.major ? true : false}
                            helperText={errors.major}
                        >
                            {majors.map((major) => (
                                <MenuItem key={major?._id} value={major?._id}>
                                    {major?.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Email"
                            type="text"
                            name="email"
                            value={formState.email}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                </Stack>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                >
                    Create Teacher
                </Button>
            </Stack>
        </form>
    );
}
