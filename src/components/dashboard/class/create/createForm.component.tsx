"use client";

import * as React from "react";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { IMajor } from "@/types/major.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import createAction from "@/actions/create.action";
import { IClass } from "@/types/class.interface";
import { pushClass } from "@/redux/slices/class.slice";
import { classSchema } from "@/validation/class.validation";
import "react-toastify/dist/ReactToastify.css";
import TeacherField from "../teacherField.component";
import { ITeacher } from "@/types/teacher.interface";

const teacherInfo: ITeacher = {
    _id: "",
    name: "",
    major: {
        _id: "",
        name: "",
    },
};

export default function CreateClassForm({ handleClose }: { handleClose: () => void }) {
    const [formState, setFormState] = React.useState({
        name: "",
        major: "",
        teacher: "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
        major: "",
        teacher: "",
    });

    const dispatch = useDispatch();

    const majors = useSelector((state: RootState) => state.major.majors) as IMajor[];

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = classSchema.safeParse({
            [name]: value,
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
            teacher: formData.get("major"),
            major: formData.get("major"),
        };

        const validatedFields = classSchema.safeParse(data);

        if (!validatedFields.success) {
            const zodErrors = validatedFields.error.flatten().fieldErrors;
            setErrors({
                name: zodErrors.name ? zodErrors.name[0] : "",
                major: zodErrors.major ? zodErrors.major[0] : "",
                teacher: zodErrors.teacher ? zodErrors.teacher[0] : "",
            });
        } else {
            const res = await createAction<IClass>("class", data);
            if (res.status && res.data) {
                toast.success("Creating new student successfully!");
                dispatch(pushClass(res.data));
                handleClose();
            } else {
                Array.isArray(res.message)
                    ? toast.error(res?.message[0])
                    : toast.error(res.message);
            }
        }
    };

    return (
        <Box width={"90%"}>
            <form action={onSubmit}>
                <Stack spacing={2}>
                    <Stack spacing={2}>
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

                        <TeacherField initialValue={teacherInfo} />
                    </Stack>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                    >
                        Create Class
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
