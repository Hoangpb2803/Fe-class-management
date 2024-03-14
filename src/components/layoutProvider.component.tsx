"use client";

import { getAllCache } from "@/caches/getAll.cache";
import { getPaginationCache } from "@/caches/getPagination";
import AdminLayout from "@/layouts/dashboard.layout";
import HomeLayout from "@/layouts/home.layout";
import { setMajor } from "@/redux/slices/major.slice";
import { setStudent } from "@/redux/slices/student.slice";
import { setTeacher } from "@/redux/slices/teacher.slice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const LayoutProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMajor = async () => {
            const res = await getAllCache("major");
            if (res.data) {
                dispatch(setMajor(res.data));
            }
        };

        fetchMajor();
    }, [dispatch]);

    if (pathname === "" || pathname === "/") {
        return <HomeLayout>{children}</HomeLayout>;
    } else {
        return <AdminLayout>{children}</AdminLayout>;
    }
};
