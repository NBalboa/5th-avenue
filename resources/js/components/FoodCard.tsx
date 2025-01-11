import { Product } from "@/Types/types";
import ImageEight from "@images/8.jpg";

type FoodCardProps = {
    product: Product;
    label: string;
    onHandleClick: () => void;
};
function FoodCard({ product, label, onHandleClick }: FoodCardProps) {
    return (
        <div className="border-2 border-white rounded-xl text-white">
            <div className="grid grid-cols-1">
                <a href="#" className="rounded-t-xl border-b-2">
                    <img
                        src={product.image}
                        className="object-fit w-full h-[200px] rounded-t-xl" // Adjusted here
                    />
                </a>
                <div className="p-5 text-white">
                    <a href="#">
                        <div className="flex justify-between gap-2">
                            <h3 className="text-xl font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-lg font-medium">
                                P{product.price}
                            </p>
                        </div>
                    </a>
                    <button
                        onClick={onHandleClick}
                        className="px-4 py-2 border-2 w-full mt-2 hover:bg-orange"
                    >
                        {label}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
