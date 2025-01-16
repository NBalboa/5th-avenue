import React, { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
    return (
        <h2 className="text-white text-center font-semibold text-2xl mb-5">
            {children}
        </h2>
    );
}

export default Title;
