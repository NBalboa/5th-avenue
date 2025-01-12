import { Cart } from "@/Types/types";

const totalItems = (carts: Cart[]): number => {
    return carts.length;
};

export default totalItems;
