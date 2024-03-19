import deleteAction from "@/actions/delete.action";
import { deleteTeacher, setTeacher } from "@/redux/slices/teacher.slice";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { modalStyle } from "@/styles/modal.style";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ITeacher } from "@/types/teacher.interface";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function DeleteTeacherModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");
    const name = searchParams.get("name");

    const dispatch = useDispatch();

    const onClickDelete = async () => {
        if (_id) {
            const res = await deleteAction<ITeacher>("teacher", _id);
            handleClose();
            if (res.status && res.data) {
                toast.success("Teacher has been successfully deleted!");
                dispatch(setTeacher(res.data));
                dispatch(deleteTeacher(_id));
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
                        Do you want to delete teacher {`"${name}"`} ?
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
