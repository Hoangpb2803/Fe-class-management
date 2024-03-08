'use client'

import AdminLayout from '@/layouts/dashboard.layout';
import HomeLayout from '@/layouts/home.layout';
import { usePathname } from 'next/navigation';

export const LayoutProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();

    if (pathname === "" || pathname === "/") {
        return (
            <HomeLayout>
                {children}
            </HomeLayout>
        )
    } else {
        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        )
    }
};