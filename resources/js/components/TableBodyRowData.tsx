import { ReactNode } from "react";

function TableBodyRowData({
    children,
    isLink = false,
    to = "#",
}: {
    children: ReactNode;
    isLink: boolean;
    to: string;
}) {
    return (
        <td className={`px-4 py-2 ${isLink ? "hover:underline" : ""}`}>
            {isLink ? <a href={to}>{children}</a> : <>{children}</>}
        </td>
    );
}

export default TableBodyRowData;
