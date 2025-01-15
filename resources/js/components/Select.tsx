import React from "react";

type SelectProps = {
    children: React.ReactNode;
    value: string;
    onHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = ({ children, value, onHandleChange }: SelectProps) => {
    return (
        <select
            value={value}
            onChange={onHandleChange}
            className="px-4 py-2 text-md w-full rounded"
        >
            {children}
        </select>
    );
};

export default Select;
