import { Cart } from "@/Types/types";

const getTotalCartPrice = (item: Cart) => {
    return item.quantity * item.product.price;
};

export default getTotalCartPrice;
