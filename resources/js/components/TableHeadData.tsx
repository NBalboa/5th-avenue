import React, { ReactNode } from "react";

function TableHeadData({ children }: { children: ReactNode }) {
    return <th className="px-[15px] py-[20px] text-left">{children}</th>;
}

export default TableHeadData;
