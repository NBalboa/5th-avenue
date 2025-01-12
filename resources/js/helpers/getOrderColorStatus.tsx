import { OrderStatus } from "@/Types/types";

const getOrderColorStatus = (status: OrderStatus): string => {
    if (OrderStatus.PENDING === status) {
        return "rounded border-2 border-yellow-400 bg-yellow-500 text-white";
    } else if (OrderStatus.CONFIRMED === status) {
        return "rounded border-2 border-blue-400 bg-blue-500 text-white";
    } else if (OrderStatus.READY === status) {
        return "rounded border-2 border-green-400 bg-green-500 text-white";
    } else {
        return "rounded border-2 border-orange bg-orange text-white";
    }
};

export default getOrderColorStatus;
