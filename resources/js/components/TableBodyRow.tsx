import { ReactNode } from "react";

function TableBodyRow({ children }: { children: ReactNode }) {
    return <tr>{children}</tr>;
}

export default TableBodyRow;
