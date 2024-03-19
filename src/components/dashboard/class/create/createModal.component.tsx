"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { modalStyle } from "@/styles/modal.style";
import CreateClassForm from "./createForm.component";

export default function CreateClassModal() {
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
                Create Class
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
                    <Box sx={modalStyle}>
                        <Stack spacing={2} alignItems={"center"}>
                            <Typography
                                id="transition-modal-title"
                                variant="h5"
                                component="h2"
                            >
                                Create class form
                            </Typography>

                            <CreateClassForm handleClose={handleClose} />
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
