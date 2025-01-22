import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { ReactNode, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function UserLayout({
    children,
    isHideLogo = false,
}: {
    children: ReactNode;
    isHideLogo?: boolean;
}) {
    useEffect(() => {
        return () => toast.remove();
    }, []);
    return (
        <div>
            <Toaster position="top-right" />
            <NavBar isHideLogo={isHideLogo} />
            <main className="m-5">{children}</main>
            <Footer />
        </div>
    );
}

export default UserLayout;
