import { Cart } from "@/Types/types";
import totalItems from "./totalItems";

const transformData = (carts: []) => {
    return carts.map((group) => {
        const firstItem: Cart = group[0];

        return {
            table: firstItem.table_id,
            total_items: totalItems(group),
        };
    });
};

export default transformData;
