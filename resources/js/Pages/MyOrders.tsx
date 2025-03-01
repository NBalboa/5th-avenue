import PaginatedLinks from "@/components/PaginatedLinks";
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
import priceFormatter from "@/helpers/priceFormatter";
import UserLayout from "@/Layouts/UserLayout";
import {
    OrderStatus,
    PaginatedData,
    PaymentStatus,
    TOrder,
} from "@/Types/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

type MyOrdersProps = {
    orders: PaginatedData<TOrder>;
    filters: OrderFilterSearch;
};

type OrderFilterSearch = {
    search: string;
    payment: string;
    order: string;
};

const MyOrders = ({ orders, filters }: MyOrdersProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [order, setOrder] = useState<string>(filters.order ?? "");
    const [payment, setPayment] = useState<string>(filters.payment ?? "");
    const [_loading, setLoading] = useState<boolean>(false);

    const handleSearch = () => {
        setLoading(true);
        const data = {
            search: search,
            order: order,
            payment: payment,
        };

        router.get("/my/orders", data, {
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <UserLayout>
            <Head title="My Orders" />

            <div>
                <div className="">
                    <div className="text-white relative max-w-xl  mx-auto border-2 border-orange rounded-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-sm w-full ps-4 py-1 text-black pe-14 rounded-full"
                        />
                        <button
                            onClick={() => handleSearch()}
                            type="button"
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-2 item-center justify-center">
                        <div>
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="px-4 w-full  py-2 text-sm rounded-lg border-2 border-orange"
                            >
                                <option value="">Order Status</option>
                                <option value={OrderStatus.PENDING}>
                                    Pending
                                </option>
                                <option value={OrderStatus.CONFIRMED}>
                                    Confirmed
                                </option>
                                <option value={OrderStatus.READY}>Ready</option>
                                <option value={OrderStatus.COMPLETED}>
                                    Completed
                                </option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                                className="px-4 w-full py-2 text-sm rounded-lg border-2 border-orange"
                            >
                                <option value="">Payment Status</option>
                                <option value={PaymentStatus.PENDING}>
                                    Pending
                                </option>
                                <option value={PaymentStatus.PAID}>Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
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
                    {orders.data.map((order) => (
                        <TableBodyRow key={order.id}>
                            <TableBodyRowData>{order.id}</TableBodyRowData>
                            <TableBodyRowData>
                                {order.table.no}
                            </TableBodyRowData>

                            <TableBodyRowData>
                                ₱{priceFormatter(order.total)}
                            </TableBodyRowData>
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

            {orders.total > orders.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {orders.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}
        </UserLayout>
    );
};

export default MyOrders;
