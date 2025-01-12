function Toggle({
    active,
    click,
    text,
    id,
}: {
    id?: number;
    active: boolean;
    click: Function;
    text: string | null;
}) {
    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <div
                    onClick={() => click(id, active)}
                    className={`relative w-[54px] h-[27px] rounded-full cursor-pointer ${
                        active ? "bg-orange" : "bg-white"
                    } transition focus:outline-orange ${
                        text ? "" : "mx-auto"
                    } focus:outline-2 hover:outline-2 hover:outline-orange`}
                >
                    <input
                        type="check"
                        defaultChecked={active}
                        className="sr-only peer"
                    />
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
        </div>
    );
}

export default Toggle;
