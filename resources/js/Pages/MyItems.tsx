import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getOrderColorStatus from "@/helpers/getOrderColorStatus";
import getOrderStatusString from "@/helpers/getOrderStatusString";
import getPaymentColorStatus from "@/helpers/getPaymentColorStatus";
import getPaymentStatusString from "@/helpers/getPaymentStatusString";
import getTotalPrice from "@/helpers/getTotalPrice";
import UserLayout from "@/Layouts/UserLayout";
import { Item, TOrder } from "@/Types/types";

type MyItemsProps = {
    order: TOrder;
    items: Item[];
};

const MyItems = ({ order, items }: MyItemsProps) => {
    console.log(order, items);
    return (
        <UserLayout>
            <h1 className="text-white text-2xl font-semibold my-2">
                List of Orders #{order.id}
            </h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-white">
                    Price: P{order.total.toFixed(2)}
                </h2>
                <h2 className="text-lg font-medium text-white">
                    No. of Items: {items.length}
                </h2>

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
                <div className="flex gap-2">
                    <h1 className="text-lg font-medium text-white">
                        Order Status:
                    </h1>
                    <p
                        className={`text-center px-2 text-md font-medium ${getOrderColorStatus(
                            order.order_status
                        )}`}
                    >
                        {getOrderStatusString(order.order_status)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <h1 className="text-lg font-medium text-white">
                        Payment Status:
                    </h1>
                    <p
                        className={`text-center px-2 text-md font-medium ${getPaymentColorStatus(
                            order.payment_status
                        )}`}
                    >
                        {getPaymentStatusString(order.payment_status)}
                    </p>
                </div>
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
                            <TableBodyRowData>
                                {item.price.toFixed(2)}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {getTotalPrice(item).toFixed(2)}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
};

export default MyItems;
