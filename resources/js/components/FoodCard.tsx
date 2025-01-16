import { Product } from "@/Types/types";
import ImageEight from "@images/8.jpg";
import OrderQuantity from "./OrderQuantity";
import React from "react";

type FoodCardProps = {
    product: Product;
    label: string;
    onHandleClick: () => void;
    onHandleQuantity?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onHandleAdd?: () => void;
    onHandleMinus?: () => void;
    onHandleBuyNow?: () => void;
    value?: number;
    showQuantity?: boolean;
    showBuyButton?: boolean;
};
function FoodCard({
    product,
    label,
    value = 1,
    onHandleClick,
    onHandleBuyNow,
    onHandleAdd,
    onHandleMinus,
    onHandleQuantity,
    showQuantity = false,
    showBuyButton = true,
}: FoodCardProps) {
    return (
        <div className="border-2 border-white rounded-xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                <img
                    src={product.image}
                    className="object-fit h-[200px] w-[200px] rounded-xl border-l-2x border-l-4xl put md:rounded-tl-lg md:rounded-bl-lg" // Adjusted here
                />
                <div className="p-5 text-white col-span-2 w-full flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                        <a href="#">
                            <div className="flex justify-between gap-2">
                                <h3 className="text-xl font-semibold">
                                    {product.name}
                                </h3>
                            </div>
                        </a>
                        {product.quantity ? (
                            <p>
                                Quantity:{" "}
                                <span className="text-orange">
                                    {product.quantity}
                                </span>
                            </p>
                        ) : null}
                    </div>
                    <div className="flex flex-col justify-between space-y-1">
                        <p className="text-lg font-medium">P{product.price}</p>
                        {showQuantity ? (
                            <div className="w-full flex justify-center md:justify-start">
                                <OrderQuantity
                                    onHandleMinus={onHandleMinus}
                                    onHandleChange={onHandleQuantity}
                                    onHandleAdd={onHandleAdd}
                                    value={value}
                                    isDisable={false}
                                />
                            </div>
                        ) : null}

                        <div className="flex flex-col md:flex-row gap-5">
                            <button
                                onClick={onHandleClick}
                                className="px-4 py-2 border-2 w-full mt-2 hover:bg-orange"
                            >
                                {label}
                            </button>
                            {showBuyButton ? (
                                <button
                                    onClick={onHandleBuyNow}
                                    className="px-4 py-2 border-2 w-full mt-2 hover:bg-orange"
                                >
                                    Buy Now
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
