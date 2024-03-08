import deleteAction from "@/actions/delete.action";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

interface IProps {
    open: boolean;
    handleClose: () => void;
}

export default function DeleteStudentModal({ open, handleClose }: IProps) {
    const searchParams = useSearchParams();
    const _id = searchParams.get("_id");
    const name = searchParams.get("name");

    const onClickDelete = async () => {
        if (_id) {
            const res = await deleteAction("student", _id);
            handleClose();
            if (res.status) {
                toast.success("Student has been successfully deleted!");
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
            <Box sx={style}>
                <Stack spacing={3}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        color={"red"}
                    >
                        <span>Do you want to delete student</span>
                        <br />
                        <span>{name} ?</span>
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
