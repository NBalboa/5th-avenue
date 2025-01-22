import OrderQuantity from "@/components/OrderQuantity";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import Title from "@/components/Title";
import getOverAllCartPrice from "@/helpers/getOverAllCartPrice";
import getTotalCartPrice from "@/helpers/getTotalCartPrice";
import priceFormatter from "@/helpers/priceFormatter";
import UserLayout from "@/Layouts/UserLayout";
import { Cart, TTable } from "@/Types/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

type CheckoutProps = {
    carts: Cart[];
    table: TTable;
};

const Checkout = ({ carts, table }: CheckoutProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleAddCartQuantity = (cart: Cart): void => {
        setLoading(true);
        if (!loading) {
            router.put(
                `/cart/add/${cart.id}`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => {
                        setLoading(false);
                    },
                }
            );
        }
    };

    const handleMinusCartQuantity = (cart: Cart): void => {
        setLoading(true);
        if (!loading) {
            router.put(
                `/cart/minus/${cart.id}`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => {
                        setLoading(false);
                    },
                }
            );
        }
    };

    const handleRemoveCart = (cart: Cart): void => {
        setLoading(true);
        if (!loading) {
            router.delete(`/cart/${cart.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Successfully deleted");
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    const handleCreateOrder = () => {
        const data = {
            total: getOverAllCartPrice(carts),
        };
        router.post(`/cart/checkout/table/${table.id}`, data, {
            preserveScroll: true,
        });
    };

    return (
        <UserLayout>
            <Head title="Checkout" />
            <h1 className="text-white text-2xl font-semibold my-2">Checkout</h1>

            <div className="mt-5 text-right space-y-3">
                <div className="flex flex-row gap-2 items-center justify-end">
                    <div className="text-white text-2xl">Total:</div>
                    <div className="text-white text-2xl">
                        P{priceFormatter(getOverAllCartPrice(carts))}
                    </div>
                </div>
                <div className="text-right">
                    <button
                        onClick={() => handleCreateOrder()}
                        className="text-white px-4 py-2 border-2 mt-2 hover:bg-orange rounded-lg"
                    >
                        Create Order
                    </button>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Image</TableHeadData>
                    <TableHeadData>Product</TableHeadData>
                    <TableHeadData>Quantity</TableHeadData>
                    <TableHeadData>Price</TableHeadData>
                    <TableHeadData>Total</TableHeadData>
                    <TableHeadData>Action</TableHeadData>
                </TableHead>
                <TableBody>
                    {carts.map((cart) => (
                        <TableBodyRow key={cart.id}>
                            <TableBodyRowData>
                                <img
                                    src={cart.product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {cart.product.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <OrderQuantity
                                    value={cart.quantity}
                                    onHandleAdd={() =>
                                        handleAddCartQuantity(cart)
                                    }
                                    onHandleMinus={() =>
                                        handleMinusCartQuantity(cart)
                                    }
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                P{priceFormatter(cart.product.price)}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                P{priceFormatter(getTotalCartPrice(cart))}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <button
                                    onClick={() => handleRemoveCart(cart)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
};

export default Checkout;
