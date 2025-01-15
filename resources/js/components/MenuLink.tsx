import { Link } from "@inertiajs/react";
import React from "react";

type MenuLinkProps = {
    to: string;
    label: string;
    active: boolean;
};

const MenuLink = ({ to, label, active = false }: MenuLinkProps) => {
    return (
        <li>
            <Link
                preserveScroll={true}
                href={to}
                className={`p-2 ${
                    active
                        ? "text-orange"
                        : "hover:border-b-2 hover:border-orange"
                } w-full block`}
            >
                {label}
            </Link>
        </li>
    );
};

export default MenuLink;
