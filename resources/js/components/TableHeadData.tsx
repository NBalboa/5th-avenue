import React, { ReactNode } from "react";

function TableHeadData({ children }: { children: ReactNode }) {
    return <th className="px-4 py-2">{children}</th>;
}

export default TableHeadData;
