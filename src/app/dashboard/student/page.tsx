"use server";

import { GetAll } from "@/apis/read.api";
import CreateStudentModal from "@/components/dashboard/student/create/createModal.component";
import StudentTable from "@/components/dashboard/student/studentTable.component";
import { IStudent } from "@/types/student.interface";
import { Box, Stack, TextField, Typography } from "@mui/material";

export default async function StudentPage() {
    let students: IStudent[] = [];
    const res = await GetAll("student");
    if (res.data) students = res.data;

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
                <TextField
                    name="seach"
                    label="Search name"
                    variant="outlined"
                    sx={{ width: "40%" }}
                />

                <CreateStudentModal />
            </Box>
            <StudentTable students={students} />
        </Stack>
    );
}
