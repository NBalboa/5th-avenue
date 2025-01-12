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
import UserLayout from "@/Layouts/UserLayout";
import { TOrder } from "@/Types/types";
import { Head, Link } from "@inertiajs/react";

type MyOrdersProps = {
    orders: TOrder[];
};

const MyOrders = ({ orders }: MyOrdersProps) => {
    return (
        <UserLayout>
            <Head title="My Orders" />
            <Table>
                <TableHead>
                    <TableHeadData>Order ID</TableHeadData>
                    <TableHeadData>Table No.</TableHeadData>
                    <TableHeadData>Price</TableHeadData>
                    <TableHeadData>Order Status</TableHeadData>
                    <TableHeadData>Payment Status</TableHeadData>
                    <TableHeadData>Orders</TableHeadData>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableBodyRow key={order.id}>
                            <TableBodyRowData>{order.id}</TableBodyRowData>
                            <TableBodyRowData>
                                {order.table.no}
                            </TableBodyRowData>

                            <TableBodyRowData>P{order.total}</TableBodyRowData>
                            <TableBodyRowData>
                                <p
                                    className={`text-center ${getOrderColorStatus(
                                        order.order_status
                                    )}`}
                                >
                                    {getOrderStatusString(order.order_status)}
                                </p>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <p
                                    className={`text-center ${getPaymentColorStatus(
                                        order.payment_status
                                    )}`}
                                >
                                    {getPaymentStatusString(
                                        order.payment_status
                                    )}
                                </p>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <Link
                                    href={`/my/orders/items/${order.id}`}
                                    className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
                                >
                                    View
                                </Link>
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
};

export default MyOrders;
