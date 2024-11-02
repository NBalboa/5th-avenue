import React, { ReactNode } from "react";

function FooterLink({ children, to }: { children: ReactNode; to: string }) {
    return (
        <li className="mb-1">
            <a
                href={to}
                className="text-white text-md hover:text-orange hover:underline"
            >
                {children}
            </a>
        </li>
    );
}

export default FooterLink;
