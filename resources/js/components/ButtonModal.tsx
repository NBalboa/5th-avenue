import React from "react";

type ButtonModalProps = {
    label: string;
    onHandleClick: () => void;
};

function ButtonModal({ label, onHandleClick }: ButtonModalProps) {
    return (
        <button
            onClick={onHandleClick}
            className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
        >
            {label}
        </button>
    );
}

export default ButtonModal;
