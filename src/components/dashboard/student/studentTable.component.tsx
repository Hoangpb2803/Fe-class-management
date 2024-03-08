"use client";
import { TypographyTableHead } from "@/components/mui/typography.component";
import { IStudent } from "@/types/student.interface";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import DeleteStudentModal from "./delete/deleteModal.component";
import UpdateStudentModal from "./update/updateModal.component";

interface Props {
    students: IStudent[];
}

export default function StudentTable({ students }: Props) {
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
                            <TypographyTableHead>Date of birth</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Major</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Level</TypographyTableHead>
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
                    {students?.map((student: IStudent, index: number) => {
                        let dateOfBirth;
                        student?.dateOfBirth
                            ? (dateOfBirth = new Date(student?.dateOfBirth))
                            : (dateOfBirth = new Date());

                        return (
                            <TableRow key={student?._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{student?.name}</TableCell>
                                <TableCell>{format(dateOfBirth, "dd-MM-yyyy")}</TableCell>
                                <TableCell>{student?.major}</TableCell>
                                <TableCell>{student?.level}</TableCell>
                                <TableCell>{student?.email}</TableCell>
                                <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => onClickUpdate(student?._id)}
                                    >
                                        update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => onClickDelete(student?._id)}
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <DeleteStudentModal open={openDelete} handleClose={handleCloseDelete} />
            <UpdateStudentModal open={openUpdate} handleClose={handleCloseUpdate} />
        </>
    );
}
