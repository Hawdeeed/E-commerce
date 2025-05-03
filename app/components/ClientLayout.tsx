"use client";
import { usePathname } from "next/navigation";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) {
        return <>{children}</>;
    }

    return (
        <CartProvider>
            <Navbar />
            <div className="w-full pt-[180px]">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* <Sidebar filterOptions={[]} /> */}
                    <main className="w-full">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </CartProvider>
    );
}
