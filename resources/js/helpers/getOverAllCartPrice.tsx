import { Cart } from "@/Types/types";
import getTotalCartPrice from "./getTotalCartPrice";

const getOverAllCartPrice = (carts: Cart[]): number => {
    return carts.reduce((total, cart) => total + getTotalCartPrice(cart), 0);
};

export default getOverAllCartPrice;
