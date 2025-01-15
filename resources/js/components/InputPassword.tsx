type InputPasswordProps = {
    value: string;
    show: boolean;
    onHandleShow: (show: boolean) => void;
    onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPassword = ({
    value,
    show,
    onHandleShow,
    onHandleChange,
}: InputPasswordProps) => {
    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onHandleChange}
                className="w-full rounded-lg px-4 py-2"
            />
            <button
                type="button"
                tabIndex={-1}
                onClick={() => onHandleShow(!show)}
                className="absolute text-black top-0 bottom-0 right-2 text-xl"
            >
                {show ? (
                    <i className="fa-solid fa-eye-slash"></i>
                ) : (
                    <i className="fa-solid fa-eye"></i>
                )}
            </button>
        </div>
    );
};

export default InputPassword;
