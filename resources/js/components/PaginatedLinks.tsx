import { Link as TLINK } from "@/Types/types";
import { Link } from "@inertiajs/react";
import React from "react";

type PaginatedLinksProps = {
    link: TLINK;
    isPreserveState?: boolean;
};

function PaginatedLinks({
    link,
    isPreserveState = false,
}: PaginatedLinksProps) {
    return (
        <div>
            <Link
                preserveState={isPreserveState}
                preserveScroll={true}
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
