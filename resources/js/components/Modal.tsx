import React, { ReactNode } from "react";

function Modal({
    children,
    show,
    title,
    setShow,
}: {
    children: ReactNode;
    show: boolean;
    title: string;
    setShow: Function;
}) {
    return (
        <div
            className={`absolute ${
                show ? "block" : "hidden"
            } h-full w-full bg-white bg-opacity-80 top-0 z-50 left-0 flex flex-row items-center justify-center bg-blur p-5`}
        >
            <div className="w-full max-w-lg mx-auto bg-black p-4 mt-4 rounded-lg">
                <div className="w-full flex justify-between mb-5">
                    <div>
                        <h2 className="text-white text-2xl">Create Product</h2>
                    </div>
                    <button
                        onClick={() => setShow(!show)}
                        className="text-white text-lg hover:text-orange"
                    >
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
