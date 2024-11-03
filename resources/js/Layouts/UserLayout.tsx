import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

function UserLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <NavBar />
            <main className="m-5">{children}</main>
            <Footer />
        </div>
    );
}

export default UserLayout;
