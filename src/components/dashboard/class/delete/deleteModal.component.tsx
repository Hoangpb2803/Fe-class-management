import deleteAction from "@/actions/delete.action";
import { deleteClass, setClass } from "@/redux/slices/class.slice";
import { modalStyle } from "@/styles/modal.style";
import { IClass } from "@/types/class.interface";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function DeleteClassModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");
    const name = searchParams.get("name");

    const dispatch = useDispatch();

    const onClickDelete = async () => {
        if (_id) {
            const res = await deleteAction<IClass>("class", _id);
            handleClose();
            if (res.status && res.data) {
                toast.success("Class has been successfully deleted!");
                dispatch(setClass(res.data));
                dispatch(deleteClass());
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
                        Do you want to delete class {`"${name}"`} ?
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
