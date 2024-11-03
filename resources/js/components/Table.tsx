import React, { ReactNode } from "react";

function Table({ children }: { children: ReactNode }) {
    return (
        <div className="mt-5 overflow-x-auto">
            <table className="w-full rounded-md text-center border border-gray-300 overflow-hidden">
                {children}
            </table>
        </div>
    );
}

export default Table;
