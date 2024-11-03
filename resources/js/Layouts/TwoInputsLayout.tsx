import React, { ReactNode } from "react";

function TwoInputsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
            {children}
        </div>
    );
}

export default TwoInputsLayout;
