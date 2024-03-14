"use server";

import CreateTeacherModal from "@/components/dashboard/teacher/create/createModal.component";
import TeacherTable from "@/components/dashboard/teacher/teacherTable.component";
import { Box, Stack, TextField, Typography } from "@mui/material";
export default async function TeacherPage() {
    return (
        <Stack spacing={4}>
            <Typography
                component="h1"
                variant="h4"
                color="primary"
                gutterBottom
                align="center"
            >
                Teacher List
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} p={2}>
                <TextField
                    name="seach"
                    label="Search name"
                    variant="outlined"
                    sx={{ width: "40%" }}
                />

                <CreateTeacherModal />
            </Box>
            <TeacherTable />
        </Stack>
    );
}
