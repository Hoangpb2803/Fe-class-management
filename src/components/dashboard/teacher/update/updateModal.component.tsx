"use client";

import updateAction from "@/actions/update.action";
import { updateTeacher } from "@/redux/slices/teacher.slice";
import { RootState } from "@/redux/store";
import { modalStyle } from "@/styles/modal.style";
import { IMajor } from "@/types/major.interface";
import { ITeacher } from "@/types/teacher.interface";
import { teacherSchema } from "@/validation/teacher.validation";
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function UpdateTeacherModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");

    const [formState, setFormState] = React.useState({
        name: "",
        dateOfBirth: "",
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

    const dispatch = useDispatch();

    const majors = useSelector((state: RootState) => state.major.majors) as IMajor[];
    const teachers = useSelector(
        (state: RootState) => state.teacher.teachers
    ) as ITeacher[];

    React.useEffect(() => {
        if (_id) {
            const teacher = teachers.find((teacher) => teacher._id === _id);
            if (teacher) {
                setFormState({
                    ...teacher,
                    dateOfBirth: format(new Date(teacher.dateOfBirth), "yyyy-MM-dd"),
                    major: teacher.major._id,
                });
            }
        }
    }, [_id, teachers]);

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        const validatedFields = teacherSchema.safeParse({
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

    const onClickUpdate = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            dateOfBirth: new Date(String(formData.get("dateOfBirth"))),
            major: formData.get("major"),
            exp: Number(formData.get("exp")),
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
            const res = await updateAction<ITeacher>(`teacher`, _id, data);
            if (res.status && res.data) {
                toast.success("Teacher has been successfully updated!");
                dispatch(updateTeacher(res.data));
                // revalidatePath("dashboard/teacher");
                handleClose();
            } else {
                Array.isArray(res.message)
                    ? toast.error(res?.message[0])
                    : toast.error(res.message);
            }
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <form action={onClickUpdate}>
                    <Stack spacing={3} alignItems={"center"}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            color={"CaptionText"}
                        >
                            Update <strong>{formState.name}</strong> infomation
                        </Typography>

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

                        <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" variant="contained" color="error">
                                Update
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
