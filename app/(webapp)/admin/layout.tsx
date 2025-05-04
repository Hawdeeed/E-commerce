// 'use client';

import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";

export const metadata: Metadata = {
    title: "Admin Portal",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}
