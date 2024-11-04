import { ReactNode, useState } from "react";

function Modal({
    children,
    title,
    showModal,
    setShowModal,
    center = false,
}: {
    children: ReactNode;
    title: string;
    showModal: boolean;
    setShowModal: Function;
    center: boolean;
}) {
    return (
        <div
            onClick={() => setShowModal(false)}
            className={`fixed ${
                showModal ? "translate-y-0" : "-translate-y-full"
            } text-start transition duration-300 ${
                center ? "flex items-center justify-center h-full" : ""
            }   w-full top-0 z-50 left-0  p-5 bg-white`}
        >
            <div
                className="w-full max-w-lg mx-auto bg-black p-4 mt-4 rounded-lg max-h-[80vh] overflow-y-auto  shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-between mb-5">
                    <div>
                        <h2 className="text-white text-2xl">{title}</h2>
                    </div>
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-white text-lg hover:text-orange"
                    >
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
