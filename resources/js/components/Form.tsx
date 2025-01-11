import React, { ReactNode } from "react";

type FormProps = {
    children: ReactNode;
    onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Form({ children, onHandleSubmit }: FormProps) {
    return (
        <form className="space-y-3" onSubmit={onHandleSubmit}>
            {children}
        </form>
    );
}

export default Form;
