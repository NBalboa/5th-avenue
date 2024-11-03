import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Sidebar />
            <div className="p-4 md:ml-64 mt-14">{children}</div>
        </div>
    );
}

export default AdminLayout;
