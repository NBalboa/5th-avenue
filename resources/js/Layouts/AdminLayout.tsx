import Sidebar from "@/components/Sidebar";
import { ReactNode, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function AdminLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        return () => toast.remove();
    }, []);
    return (
        <div>
            <Toaster />
            <Sidebar />
            <div className="p-4 md:ml-64 mt-14">{children}</div>
        </div>
    );
}

export default AdminLayout;
