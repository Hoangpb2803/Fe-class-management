"use client";

import { TypographyTableHead } from "@/components/mui/typography.component";
import { IStudent } from "@/types/student.interface";
import { Button, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DeleteStudentModal from "./delete/deleteModal.component";
import UpdateStudentModal from "./update/updateModal.component";
import { toast } from "react-toastify";
import { getPaginationCache } from "@/caches/getPagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setStudent } from "@/redux/slices/student.slice";
import { getAllCache } from "@/caches/getAll.cache";
import { IUrlParams } from "@/types/urlParam.interface";

export default function StudentTable() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);

    const [numberStudent, setNumberStudent] = useState<number>(0);
    const [currPage, setCurrPage] = useState<number>(0);

    const dispatch = useDispatch();
    const students = useSelector(
        (state: RootState) => state.student.students
    ) as IStudent[];

    const isChange = useSelector(
        (state: RootState) => state.student.isChangeStudentsNumber
    ) as boolean;

    const params = useMemo(() => {
        return new URLSearchParams(searchParams);
    }, [searchParams]);

    const updateUrlParams = useCallback(
        (newParams: IUrlParams[]) => {
            // delete all params
            while (params.keys().next().done === false) {
                params.delete(params.keys().next().value);
            }
            // set new params
            newParams.forEach((param) => params.set(param.key, param.value));
            router.push(`${pathName}?${params.toString()}`);
        },
        [params, pathName, router]
    );

    useEffect(() => {
        const studentFetch = async () => {
            const res = await getAllCache("student");
            if (res.data) setNumberStudent(res.data);
        };

        studentFetch();
    }, [isChange]);

    useEffect(() => {
        const getCurrStudent = async () => {
            if (page && !isNaN(Number(page))) {
                const res = await getPaginationCache("student", Number(page));
                if (res.data[0]) {
                    dispatch(setStudent(res.data));
                    setCurrPage(Number(page) - 1);
                } else {
                    setCurrPage(0);
                    updateUrlParams([{ key: "page", value: "1" }]);
                }
            } else {
                const res = await getPaginationCache("student", 1);
                if (res.data) {
                    dispatch(setStudent(res.data));
                }
            }
        };
        getCurrStudent();
    }, [page, dispatch, updateUrlParams]);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => {
        setOpenDelete(false);
        updateUrlParams([{ key: "page", value: String(currPage + 1) }]);
    };

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        updateUrlParams([{ key: "page", value: String(currPage + 1) }]);
    };

    const onChangePage = (newPage: number) => {
        setCurrPage(newPage);
        updateUrlParams([{ key: "page", value: String(newPage + 1) }]);
    };

    const onClickDelete = (_id: string, name: string) => {
        handleOpenDelete();
        updateUrlParams([
            { key: "page", value: String(currPage + 1) },
            { key: "_id", value: _id },
            { key: "name", value: name },
        ]);
    };

    const onClickUpdate = (_id: string) => {
        handleOpenUpdate();
        updateUrlParams([
            { key: "page", value: String(currPage + 1) },
            { key: "_id", value: _id },
        ]);
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
                                <TableCell>{student?.major.name}</TableCell>
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
                                        onClick={() =>
                                            onClickDelete(student?._id, student?.name)
                                        }
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={numberStudent}
                rowsPerPage={5}
                page={currPage}
                onPageChange={(e, newPage) => onChangePage(newPage)}
            />
            <DeleteStudentModal open={openDelete} handleClose={handleCloseDelete} />
            <UpdateStudentModal open={openUpdate} handleClose={handleCloseUpdate} />
        </>
    );
}
