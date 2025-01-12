import { OrderStatus } from "@/Types/types";

const getOrderStatusString = (status: OrderStatus) => {
    if (OrderStatus.PENDING === status) {
        return "Pending";
    } else if (OrderStatus.CONFIRMED === status) {
        return "Confirmed";
    } else if (OrderStatus.READY === status) {
        return "Ready";
    } else {
        return "Completed";
    }
};

export default getOrderStatusString;
