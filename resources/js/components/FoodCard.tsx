import ImageEight from "@images/8.jpg";
function FoodCard() {
    return (
        <div className="border-2 border-white rounded-xl text-white">
            <div className="grid grid-cols-1">
                <a href="#" className="rounded-t-xl border-b-2">
                    <img
                        src={ImageEight}
                        className="object-fit w-full h-[200px] rounded-t-xl" // Adjusted here
                    />
                </a>
                <div className="p-5 text-white">
                    <a href="#">
                        <div className="flex justify-between gap-2">
                            <h3 className="text-xl font-semibold">
                                Chicken Silog
                            </h3>
                            <p className="text-lg font-medium">P100</p>
                        </div>
                    </a>
                    <button className="px-4 py-2 border-2 w-full mt-2 hover:bg-orange">
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
