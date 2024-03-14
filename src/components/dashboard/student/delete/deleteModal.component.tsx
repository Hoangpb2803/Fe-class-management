import deleteAction from "@/actions/delete.action";
import { deleteStudent, setStudent } from "@/redux/slices/student.slice";
import { modalStyle } from "@/styles/modal.style";
import { IStudent } from "@/types/student.interface";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function DeleteStudentModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");
    const name = searchParams.get("name");

    const dispatch = useDispatch();

    const onClickDelete = async () => {
        if (_id) {
            const res = await deleteAction<IStudent>("student", _id);
            handleClose();
            if (res.status && res.data) {
                toast.success("Student has been successfully deleted!");
                dispatch(setStudent(res.data));
                dispatch(deleteStudent());
            } else {
                toast.error("Something went wrong!");
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
            <Box sx={{ ...modalStyle, width: 500 }}>
                <Stack spacing={4}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        textAlign={"center"}
                        color={"red"}
                    >
                        Do you want to delete student {`"${name}"`} ?
                    </Typography>
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <form action={onClickDelete}>
                            <Button type="submit" variant="contained" color="error">
                                Delete
                            </Button>
                        </form>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
