import { Link } from "@inertiajs/react";
import React from "react";

function NavLink({
    children,
    path = "#",
    isActive = false,
}: {
    children: React.ReactNode;
    isActive: boolean;
    path: string;
}) {
    return (
        <li className="hidden md:block">
            <Link
                preserveScroll={true}
                href={path}
                className={`p-2 ${
                    isActive
                        ? "text-orange"
                        : "text-white hover:border-b-2 hover:border-orange"
                }`}
            >
                {children}
            </Link>
        </li>
    );
}

export default NavLink;
