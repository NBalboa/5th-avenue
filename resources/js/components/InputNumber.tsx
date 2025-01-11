import React from "react";

type InputNumberProps = {
    value: string;
    onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isWidthFull?: boolean;
};
function InputNumber({
    value,
    onHandleChange,
    isWidthFull = true,
}: InputNumberProps) {
    return (
        <input
            type="number"
            value={value}
            onChange={onHandleChange}
            className={`px-4 py-2 text-md ${
                isWidthFull ? "w-full" : null
            } rounded `}
        />
    );
}

export default InputNumber;
