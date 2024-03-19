"use client";

import { TypographyTableHead } from "@/components/mui/typography.component";
import { ITeacher } from "@/types/teacher.interface";
import { Button, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DeleteTeacherModal from "./delete/deleteModal.component";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UpdateTeacherModal from "./update/updateModal.component";
import { useDispatch, useSelector } from "react-redux";
import { getPaginationCache } from "@/caches/getPagination";
import { setTeacher } from "@/redux/slices/teacher.slice";
import { RootState } from "@/redux/store";
import { IUrlParams } from "@/types/urlParam.interface";
import { getNumberCache } from "@/caches/getNumber.cache";

export default function TeacherTable() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const [openDelete, setOpenDelete] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);

    const [numberTeacher, setNumberTeacher] = useState<number>(0);
    const [currPage, setCurrPage] = useState<number>(0);

    const dispatch = useDispatch();
    const teachers = useSelector(
        (state: RootState) => state.teacher.teachers
    ) as ITeacher[];

    const isChange = useSelector(
        (state: RootState) => state.teacher.isChangeStudentsNumber
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
        const teacherFetch = async () => {
            const res = await getNumberCache("teacher");
            if (res.data) setNumberTeacher(res.data);
        };

        teacherFetch();
    }, [isChange]);

    useEffect(() => {
        const getCurrTeacher = async () => {
            if (page && !isNaN(Number(page))) {
                const res = await getPaginationCache("teacher", Number(page));
                if (res.data[0]) {
                    dispatch(setTeacher(res.data));
                    setCurrPage(Number(page) - 1);
                } else {
                    setCurrPage(0);
                    updateUrlParams([{ key: "page", value: "1" }]);
                }
            } else {
                const res = await getPaginationCache("teacher", 1);
                if (res.data) {
                    dispatch(setTeacher(res.data));
                }
            }
        };
        getCurrTeacher();
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
                                            onClickDelete(teacher?._id, teacher?.name);
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
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={numberTeacher}
                rowsPerPage={5}
                page={currPage}
                onPageChange={(e, newPage) => onChangePage(newPage)}
            />
            <DeleteTeacherModal open={openDelete} handleClose={handleCloseDelete} />
            <UpdateTeacherModal open={openUpdate} handleClose={handleCloseUpdate} />
        </>
    );
}
