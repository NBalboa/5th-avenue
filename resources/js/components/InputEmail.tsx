import React from "react";

type InputEmailProps = {
    value: string;
    onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputEmail = ({ value, onHandleChange }: InputEmailProps) => {
    return (
        <input
            type="email"
            value={value}
            onChange={onHandleChange}
            className="px-4 py-2 text-md w-full rounded"
        />
    );
};

export default InputEmail;
