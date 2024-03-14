"use server";

import CreateStudentModal from "@/components/dashboard/student/create/createModal.component";
import SearchStudent from "@/components/dashboard/student/search.component";
import StudentTable from "@/components/dashboard/student/studentTable.component";
import { Box, Stack, Typography } from "@mui/material";

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
                Student List
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} p={2}>
                <SearchStudent />

                <CreateStudentModal />
            </Box>
            <StudentTable />
        </Stack>
    );
}
