import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getTotalPrice from "@/helpers/getTotalPrice";
import AdminLayout from "@/Layouts/AdminLayout";
import { Item, TOrder } from "@/Types/types";
import { Head } from "@inertiajs/react";

type OrderItemsProps = {
    order: TOrder;
    items: Item[];
};

function OrderItems({ order, items }: OrderItemsProps) {
    return (
        <AdminLayout>
            <Head title="Items" />
            <h1 className="text-white text-2xl font-semibold my-2">
                List of Orders #{order.id}
            </h1>
            <div>
                <h2 className="text-lg font-medium text-white">
                    Price: P{order.total}
                </h2>
                <h2 className="text-lg font-medium text-white">
                    No. of Items: {items.length}
                </h2>

                {order.customer ? (
                    <h2 className="text-lg font-medium text-white">
                        Customer: {order.customer.first_name}{" "}
                        {order.customer.last_name}
                    </h2>
                ) : null}
                {order.cashier ? (
                    <h2 className="text-lg font-medium text-white">
                        Cashier: {order.cashier.first_name}{" "}
                        {order.cashier.last_name}
                    </h2>
                ) : null}

                {order.table_id ? (
                    <h2 className="text-lg font-medium text-white">
                        Table No: {order.table_id}
                    </h2>
                ) : null}
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Image</TableHeadData>
                    <TableHeadData>Name</TableHeadData>
                    <TableHeadData>Quantity</TableHeadData>
                    <TableHeadData>Price</TableHeadData>
                    <TableHeadData>Total</TableHeadData>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableBodyRow key={item.id}>
                            <TableBodyRowData>
                                <img
                                    src={item.product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {item.product.name}
                            </TableBodyRowData>
                            <TableBodyRowData>{item.quantity}</TableBodyRowData>
                            <TableBodyRowData>{item.price}</TableBodyRowData>
                            <TableBodyRowData>
                                {getTotalPrice(item)}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </AdminLayout>
    );
}

export default OrderItems;
