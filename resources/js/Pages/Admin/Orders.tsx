import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    OrderStatus,
    PaginatedData,
    PaymentStatus,
    TOrder,
} from "@/Types/types";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type OrderProps = {
    orders: PaginatedData<TOrder>;
    filters: OrderSearch;
};

type OrderSearch = {
    search: string | null;
    orderStatus: string | null;
    paymentStatus: string | null;
};

function Orders({ orders, filters }: OrderProps) {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [orderStatus, setOrderStatus] = useState<string>(
        filters.orderStatus ?? ""
    );
    const [paymentStatus, setPaymentStatus] = useState<string>(
        filters.paymentStatus ?? ""
    );

    function handleOrderUpdateStatus(
        e: React.ChangeEvent<HTMLSelectElement>,
        order_id: number
    ): void {
        const data = {
            status: e.target.value,
        };

        router.put(`/orders/update/orderstatus/${order_id}`, data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Order status updated successfully");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        });
    }

    function handlePaymentUpdateStatus(
        e: React.ChangeEvent<HTMLSelectElement>,
        order_id: number
    ): void {
        const data = {
            status: e.target.value,
        };

        router.put(`/orders/update/paymentstatus/${order_id}`, data, {
            preserveScroll: true,
            replace: true,
            onSuccess: () => {
                toast.success("Payment status updated successfully");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        });
    }

    function getOrderColorStatus(status: OrderStatus): string {
        if (OrderStatus.PENDING === status) {
            return "border-yellow-400 bg-yellow-500 text-white";
        } else if (OrderStatus.CONFIRMED === status) {
            return "border-blue-400 bg-blue-500 text-white";
        } else if (OrderStatus.READY === status) {
            return "border-green-400 bg-green-500 text-white";
        } else {
            return "border-orange bg-orange text-white";
        }
    }

    function getPaymentColorStatus(status: PaymentStatus): string {
        if (PaymentStatus.PENDING === status) {
            return "border-yellow-400 bg-yellow-500 text-white";
        } else {
            return "border-green-400 bg-green-500 text-white";
        }
    }

    function handleSearch() {
        const data = {
            search: search,
            orderStatus: orderStatus,
            paymentStatus: paymentStatus,
        };

        router.get("/orders", data, {
            preserveScroll: true,
            replace: true,
        });
    }

    return (
        <AdminLayout>
            <Head title="Orders" />
            <h1 className="text-white text-2xl font-semibold my-2">Orders</h1>

            <div>
                <div className="flex md:flex-row flex-col my-5 gap-5 items-center">
                    <div className="text-white relative w-full  mx-auto border-2 border-orange rounded-full">
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
                    <div>
                        <select
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Order Status</option>
                            <option value={OrderStatus.PENDING}>Pending</option>
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
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
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

            <Table>
                <TableHead>
                    <TableHeadData>Order ID</TableHeadData>
                    <TableHeadData>Table ID</TableHeadData>
                    <TableHeadData>Price</TableHeadData>
                    <TableHeadData>Order Status</TableHeadData>
                    <TableHeadData>Payment Status</TableHeadData>
                    <TableHeadData>Orders</TableHeadData>
                </TableHead>
                <TableBody>
                    {orders?.data.map((order) => (
                        <TableBodyRow key={order.id}>
                            <TableBodyRowData>{order.id}</TableBodyRowData>
                            <TableBodyRowData>
                                {order.table_id}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                P{order.total.toFixed(2)}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <select
                                    value={order.order_status}
                                    onChange={(e) =>
                                        handleOrderUpdateStatus(e, order.id)
                                    }
                                    className={`rounded border-2 ${getOrderColorStatus(
                                        order.order_status
                                    )}`}
                                >
                                    <option
                                        value={OrderStatus.PENDING}
                                        className="bg-yellow-400"
                                    >
                                        Pending
                                    </option>
                                    <option
                                        value={OrderStatus.CONFIRMED}
                                        className="bg-blue-400"
                                    >
                                        Confirmed
                                    </option>
                                    <option
                                        value={OrderStatus.READY}
                                        className="bg-green-400"
                                    >
                                        Ready
                                    </option>
                                    <option
                                        value={OrderStatus.COMPLETED}
                                        className="bg-orange"
                                    >
                                        Completed
                                    </option>
                                </select>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <select
                                    value={order.payment_status}
                                    onChange={(e) =>
                                        handlePaymentUpdateStatus(e, order.id)
                                    }
                                    className={`rounded border-2 ${getPaymentColorStatus(
                                        order.payment_status
                                    )}`}
                                >
                                    <option
                                        value={PaymentStatus.PENDING}
                                        className="bg-yellow-400"
                                    >
                                        Pending
                                    </option>
                                    <option
                                        value={PaymentStatus.PAID}
                                        className="bg-green-400"
                                    >
                                        Paid
                                    </option>
                                </select>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <Link
                                    href={`/orders/items/${order.id}`}
                                    className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
                                >
                                    View
                                </Link>
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
            <div className="w-full text-center mt-5">
                {orders.links.map((link, index) => (
                    <PaginatedLinks key={index} link={link} />
                ))}
            </div>

            <div className="w-full mt-5 text-right">
                <Link
                    href="/orders/create"
                    className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
                >
                    Create Order
                </Link>
            </div>
        </AdminLayout>
    );
}

export default Orders;
