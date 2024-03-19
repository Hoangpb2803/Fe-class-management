"use client";

import updateAction from "@/actions/update.action";
import { getAllCache } from "@/caches/getAll.cache";
import { getDetailCache } from "@/caches/getDetail.cache";
import { levels } from "@/constants/fixedValue.constant";
import { updateStudent } from "@/redux/slices/student.slice";
import { RootState } from "@/redux/store";
import { modalStyle } from "@/styles/modal.style";
import { IMajor } from "@/types/major.interface";
import { IStudent } from "@/types/student.interface";
import { studentSchema } from "@/validation/student.validation";
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
import { revalidateTag } from "next/cache";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function UpdateStudentModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");

    const [name, setName] = React.useState("");
    const [formState, setFormState] = React.useState({
        name: "",
        dateOfBirth: "",
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

    const dispatch = useDispatch();

    const majors = useSelector((state: RootState) => state.major.majors) as IMajor[];

    const students = useSelector(
        (state: RootState) => state.student.students
    ) as IStudent[];

    React.useEffect(() => {
        if (_id) {
            const student = students.find((student) => student._id === _id);
            if (student) {
                setName(student.name);
                setFormState({
                    ...student,
                    dateOfBirth: format(new Date(student.dateOfBirth), "yyyy-MM-dd"),
                    major: student.major._id,
                });
            }
        }
    }, [_id, students]);

    const onBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const { name, value } = e.target;

        // handle validate bu zod
        const validatedFields = studentSchema.safeParse({
            [name]: name === "dateOfBirth" ? new Date(value) : value,
        });

        if (!validatedFields.success) {
            // get error from zod
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
            level: formData.get("level"),
            email: formData.get("email"),
        };

        // handle validate by zod
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
            const res = await updateAction<IStudent>("student", _id, data);
            if (res.status && res.data) {
                toast.success("Student has been successfully updated!");
                dispatch(updateStudent({ ...res.data }));
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
                            Update <strong>{name}</strong> infomation
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

                        <Stack
                            width={"100%"}
                            direction={"row"}
                            spacing={2}
                            justifyContent={"flex-end"}
                        >
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
