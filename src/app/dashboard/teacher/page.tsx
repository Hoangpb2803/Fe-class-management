"use server";

import { GetAll } from "@/apis/read.api";
import CreateTeacherModal from "@/components/dashboard/teacher/create/createModal.component";
import TeacherTable from "@/components/dashboard/teacher/teacherTable.component";
import { ITeacher } from "@/types/teacher.interface";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { revalidateTag } from "next/cache";

export default async function TeacherPage() {
    let teachers: ITeacher[] = [];
    const res = await GetAll("teacher");
    if (res.data) teachers = res.data;

    revalidateTag("teacher");

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
            <TeacherTable teachers={teachers} />
        </Stack>
    );
}
