"use client";

import * as React from "react";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { levels } from "@/constants/fixedValue.constant";
import { IMajor } from "@/types/major.interface";
import createAction from "@/actions/create.action";

import "react-toastify/dist/ReactToastify.css";
import { studentSchema } from "@/validation/student.validation";
import { getAllCache } from "@/caches/getAll.cache";

export default function CreateStudentForm({ handleClose }: { handleClose: () => void }) {
    const [majors, setMajors] = React.useState<IMajor[]>([]);
    const [formState, setFormState] = React.useState({
        name: "",
        dateOfBirth: format(new Date(2000, 2, 28), "yyyy-MM-dd"),
        major: "",
        level: "",
        email: "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
        dateOfBirth: "",
        major: "",
        level: "",
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

        const validatedFields = studentSchema.safeParse({
            [name]: name === "dateOfBirth" ? new Date(value) : value,
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
        const data = {
            name: formData.get("name"),
            dateOfBirth: new Date(String(formData.get("dateOfBirth"))),
            major: formData.get("major"),
            level: formData.get("level"),
            email: formData.get("email"),
        };

        const validatedFields = studentSchema.safeParse(data);

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            setErrors({
                name: zodErrors.name ? zodErrors.name[0] : "",
                dateOfBirth: zodErrors.dateOfBirth ? zodErrors.dateOfBirth[0] : "",
                major: zodErrors.major ? zodErrors.major[0] : "",
                level: zodErrors.level ? zodErrors.level[0] : "",
                email: zodErrors.email ? zodErrors.email[0] : "",
            });
        } else {
            const res = await createAction("student", data);
            if (res.status) {
                toast.success("Creating new student successfully!");
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
                            name="level"
                            label="Level"
                            select
                            fullWidth
                            margin="normal"
                            value={formState.level}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.level ? true : false}
                            helperText={errors.level}
                        >
                            {levels.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
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
                    Create Student
                </Button>
            </Stack>
        </form>
    );
}
