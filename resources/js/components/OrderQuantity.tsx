type OrderQuantityProps = {
    value: number;
    onHandleAdd: () => void;
    onHandleMinus: () => void;
};

function OrderQuantity({
    value,
    onHandleAdd,
    onHandleMinus,
}: OrderQuantityProps) {
    return (
        <div className="flex items-center">
            <button
                onClick={onHandleMinus}
                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-orange bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-orange hover:text-white focus:ring-4 focus:ring-gray-200 "
                type="button"
            >
                <span className="sr-only">Quantity button</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                    />
                </svg>
            </button>
            <div>
                <input
                    type="text"
                    value={value}
                    disabled
                    min="0"
                    className="text-center text-black bg-white w-14 border border-orange text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                />
            </div>
            <button
                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-orange bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-orange hover:text-white focus:ring-4 focus:ring-gray-200 "
                type="button"
                onClick={onHandleAdd}
            >
                <span className="sr-only">Quantity button</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
        </div>
    );
}

export default OrderQuantity;
