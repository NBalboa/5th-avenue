import React from "react";

type SelectProps = {
    children: React.ReactNode;
    value: string;
    onHandleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isFullWidth?: boolean;
};
const Select = ({
    children,
    value,
    onHandleChange,
    isFullWidth = true,
}: SelectProps) => {
    return (
        <select
            value={value}
            onChange={onHandleChange}
            className={`px-4 py-2 text-md ${
                isFullWidth ? "w-full" : null
            } rounded`}
        >
            {children}
        </select>
    );
};

export default Select;
