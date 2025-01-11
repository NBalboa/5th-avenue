import React, { ReactNode } from "react";

type InputWrapperProps = {
    children: ReactNode;
};

function InputWrapper({ children }: InputWrapperProps) {
    return <div className="space-y-2">{children}</div>;
}

export default InputWrapper;
