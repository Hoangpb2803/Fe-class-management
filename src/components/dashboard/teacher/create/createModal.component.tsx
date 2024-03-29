"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateTeacherForm from "./createForm.component";
import { Stack } from "@mui/material";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

export default function CreateTeacherModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button
                variant="contained"
                color="success"
                onClick={handleOpen}
                sx={{ height: "100%" }}
            >
                Create Teacher
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Stack alignItems={"center"} spacing={2}>
                            <Typography
                                id="transition-modal-title"
                                variant="h5"
                                component="h2"
                            >
                                Create student form
                            </Typography>

                            <CreateTeacherForm handleClose={handleClose} />
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
