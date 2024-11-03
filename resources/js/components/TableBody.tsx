import React, { ReactNode } from "react";

function TableBody({ children }: { children: ReactNode }) {
    return (
        <tbody className="text-white bg-white bg-opacity-10 max-text-sm">
            {children}
        </tbody>
    );
}

export default TableBody;
