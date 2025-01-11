import { Item } from "../Types/types";

const getTotalPrice = (item: Item): number => {
    return item.quantity * item.price;
};

export default getTotalPrice;
