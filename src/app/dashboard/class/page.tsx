"use server";

import ClassTable from "@/components/dashboard/class/classTable.component";
import CreateClassModal from "@/components/dashboard/class/create/createModal.component";
import { Box, Stack, TextField, Typography } from "@mui/material";

export default async function StudentPage() {
    return (
        <Stack spacing={4}>
            <Typography
                component="h1"
                variant="h4"
                color="primary"
                gutterBottom
                align="center"
            >
                Class List
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} p={2}>
                <TextField
                    name="seach"
                    label="Search name"
                    variant="outlined"
                    sx={{ width: "40%" }}
                />

                <CreateClassModal />
            </Box>
            <ClassTable />
        </Stack>
    );
}
