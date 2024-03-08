"use client";

import { TypographyTableHead } from "@/components/mui/typography.component";
import { ITeacher } from "@/types/teacher.interface";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import React from "react";
import DeleteTeacherModal from "./delete/deleteModal.component";
import { usePathname, useRouter } from "next/navigation";
import UpdateTeacherModal from "./update/updateModal.component";

interface Props {
    teachers: ITeacher[];
}

export default function TeacherTable({ teachers }: Props) {
    const router = useRouter();
    const pathName = usePathname();

    const [openDelete, setOpenDelete] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => {
        setOpenDelete(false);
        router.push(pathName);
    };

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        router.push(pathName);
    };

    const onClickDelete = (_id: string) => {
        handleOpenDelete();
        router.push(`${pathName}?_id=${_id}`);
    };

    const onClickUpdate = (_id: string) => {
        handleOpenUpdate();
        router.push(`${pathName}?_id=${_id}`);
    };

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TypographyTableHead>No</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Name</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Date Of Birth</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Major</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Experience</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Email</TypographyTableHead>
                        </TableCell>
                        <TableCell align="right">
                            <TypographyTableHead>Action</TypographyTableHead>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers?.map((teacher: ITeacher, index: number) => {
                        let dateOfBirth: Date;
                        teacher?.dateOfBirth
                            ? (dateOfBirth = new Date(teacher?.dateOfBirth))
                            : (dateOfBirth = new Date());

                        return (
                            <TableRow key={teacher?._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{teacher?.name}</TableCell>
                                <TableCell>{format(dateOfBirth, "dd-MM-yyyy")}</TableCell>
                                <TableCell>{teacher?.major?.name}</TableCell>
                                <TableCell>
                                    {teacher?.exp} {teacher?.exp > 1 ? "years" : "year"}
                                </TableCell>
                                <TableCell>{teacher?.email}</TableCell>
                                <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => {
                                            onClickUpdate(teacher?._id);
                                        }}
                                    >
                                        update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            onClickDelete(teacher?._id);
                                        }}
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <DeleteTeacherModal open={openDelete} handleClose={handleCloseDelete} />
            <UpdateTeacherModal open={openUpdate} handleClose={handleCloseUpdate} />
        </>
    );
}
