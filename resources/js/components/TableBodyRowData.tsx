import { ReactNode } from "react";

function TableBodyRowData({
    children,
    isLink = false,
    to = "#",
    click,
}: {
    children?: ReactNode;
    isLink?: boolean;
    to?: string;
    click?: Function;
}) {
    return (
        <td
            className={`px-[15px] py-[20px] ${isLink ? "hover:underline" : ""}`}
        >
            {isLink ? (
                <a href={to} onClick={() => click?.()}>
                    {children}
                </a>
            ) : (
                <>{children}</>
            )}
        </td>
    );
}

export default TableBodyRowData;
