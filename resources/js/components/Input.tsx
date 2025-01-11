import React from "react";

type InputProps = {
    value: string;
    onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ value, onHandleChange }: InputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onHandleChange}
            className="px-4 py-2 text-md w-full rounded"
        />
    );
}

export default Input;
