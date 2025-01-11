type FormButtonProps = {
    label: string;
};

function FormButton({ label }: FormButtonProps) {
    return (
        <button
            type="submit"
            className="border-2 border-white px-4 py-2 text-white text-md w-full hover:bg-orange"
        >
            {label}
        </button>
    );
}

export default FormButton;
