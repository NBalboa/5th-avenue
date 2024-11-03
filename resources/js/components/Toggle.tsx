import React from "react";

function Toggle({
    active,
    click,
    text,
}: {
    active: boolean;
    click: Function;
    text: string | null;
}) {
    return (
        <div className="flex flex-row items-center gap-2">
            <div
                onClick={() => click(active)}
                className={`relative w-[54px] h-[27px] rounded-full cursor-pointer ${
                    active ? "bg-orange" : "bg-white"
                } transition focus:outline-orange ${
                    text ? "" : "mx-auto"
                } focus:outline-2 hover:outline-2 hover:outline-orange`}
            >
                <input type="check" checked={active} className="sr-only peer" />
                <span
                    className={`absolute w-[18px] h-[18px] rounded-full top-1 ${
                        active ? "left-8 bg-white" : "left-1 bg-orange"
                    } bottom-0 transition transition-all ease-in duration-300`}
                ></span>
            </div>
            <p className={`${!text ? "hidden" : ""} text-white text-md`}>
                {text}
            </p>
        </div>
    );
}

export default Toggle;
