"use client";

import { getPaginationCache } from "@/caches/getPagination";
import { TypographyTableHead } from "@/components/mui/typography.component";
import { setClass } from "@/redux/slices/class.slice";
import { RootState } from "@/redux/store";
import { IClass } from "@/types/class.interface";
import { IUrlParams } from "@/types/urlParam.interface";
import { Button, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteClassModal from "./delete/deleteModal.component";
import { getNumberCache } from "@/caches/getNumber.cache";

export default function ClassTable() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);

    const [numberClasses, setNumberClasses] = useState<number>(0);
    const [currPage, setCurrPage] = useState<number>(0);

    const dispatch = useDispatch();
    const classes = useSelector((state: RootState) => state.class.classes) as IClass[];

    const isChange = useSelector(
        (state: RootState) => state.class.isChangeClassesNumber
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
            const res = await getNumberCache("class");
            if (res.data) setNumberClasses(res.data);
        };

        studentFetch();
    }, [isChange]);

    useEffect(() => {
        const getCurrStudent = async () => {
            if (page && !isNaN(Number(page))) {
                const res = await getPaginationCache("class", Number(page));
                if (res.data[0]) {
                    dispatch(setClass(res.data));
                    setCurrPage(Number(page) - 1);
                } else {
                    setCurrPage(0);
                    updateUrlParams([{ key: "page", value: "1" }]);
                }
            } else {
                const res = await getPaginationCache("class", 1);
                if (res.data) {
                    dispatch(setClass(res.data));
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
                            <TypographyTableHead>Major</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Teacher</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Number of Student</TypographyTableHead>
                        </TableCell>
                        <TableCell align="right">
                            <TypographyTableHead>Action</TypographyTableHead>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classes?.map((classItem: IClass, index: number) => {
                        const numberStudents = classItem?.students.length;
                        return (
                            <TableRow key={classItem?._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{classItem?.name}</TableCell>
                                <TableCell>{classItem?.major.name}</TableCell>
                                <TableCell>{classItem?.teacher.name}</TableCell>
                                <TableCell>
                                    {numberStudents}
                                    <span>
                                        {numberStudents > 1 ? " students" : " student"}
                                    </span>
                                </TableCell>
                                <TableCell align="right" sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => onClickUpdate(classItem?._id)}
                                    >
                                        update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                            onClickDelete(classItem?._id, classItem?.name)
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
                count={numberClasses}
                rowsPerPage={5}
                page={currPage}
                onPageChange={(e, newPage) => onChangePage(newPage)}
            />
            <DeleteClassModal open={openDelete} handleClose={handleCloseDelete} />
        </>
    );
}
