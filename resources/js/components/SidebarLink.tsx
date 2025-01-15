import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

function SidebarLink({
    children,
    to,
    active = false,
}: {
    children: ReactNode;
    to: string;
    active: boolean;
}) {
    return (
        <li>
            <Link
                preserveScroll={true}
                href={to}
                className={`block px-4 py-2 rounded mb-2 text-white text-lg ${
                    active ? "bg-orange" : "hover:bg-white hover:bg-opacity-20"
                }`}
            >
                {children}
            </Link>
        </li>
    );
}

export default SidebarLink;
