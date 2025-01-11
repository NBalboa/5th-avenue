import { Link as TLINK } from "@/Types/types";
import { Link } from "@inertiajs/react";
import React from "react";

type PaginatedLinksProps = {
    link: TLINK;
};

function PaginatedLinks({ link }: PaginatedLinksProps) {
    return (
        <div>
            <Link
                href={link.url ? link.url : "#"}
                className={`px-4 py-2 text-white  ${
                    link.active ? "bg-orange " : "hover:bg-orange"
                } ${link.url ? null : "hidden"}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        </div>
    );
}

export default PaginatedLinks;
