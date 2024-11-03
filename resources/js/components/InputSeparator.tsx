import React, { ReactNode } from "react";

function InputSeparator({ children }: { children: ReactNode }) {
    return <div className="w-full space-y-2">{children}</div>;
}

export default InputSeparator;
