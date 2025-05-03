import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Portal",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
