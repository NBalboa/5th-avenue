import FoodCard from "@/components/FoodCard";
import InputNumber from "@/components/InputNumber";
import Label from "@/components/Label";
import OrderQuantity from "@/components/OrderQuantity";
import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Category,
    Order,
    PaginatedData,
    Product,
    ProductSearchFilters,
    TTable,
} from "@/Types/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

type OrdersCreateProps = {
    products: PaginatedData<Product>;
    tables: TTable[];
    categories: Category[];
    filters: ProductSearchFilters;
};

function OrdersCreate({
    products,
    tables,
    categories,
    filters,
}: OrdersCreateProps) {
    const [orders, setOrders] = useState<Order<Product>[]>([]);
    const [amountRender, setAmountRender] = useState<string>("");
    const [table, setTable] = useState<string>("");
    const [search, setSearch] = useState(filters.search ?? "");
    const [category, setCategory] = useState(filters.category ?? "");
    const addProduct = (newProduct: Product) => {
        setOrders((prev) => {
            const exist = prev.find(
                (order) => order.product.id === newProduct.id
            );

            if (!exist) {
                toast.success("Successfully added");
                return [...prev, { product: newProduct, order_quantity: 1 }];
            } else {
                toast.error("Product added already");
                return prev;
            }
        });
    };

    function handleAdd(id: number) {
        setOrders((prev) => {
            return prev.map((order) => {
                if (order.product.id === id) {
                    return {
                        ...order,
                        order_quantity: order.order_quantity + 1,
                    };
                }
                return order;
            });
        });
    }

    function handleMinus(id: number) {
        setOrders((prev) => {
            return prev.map((order) => {
                if (order.product.id === id && order.order_quantity > 1) {
                    return {
                        ...order,
                        order_quantity: order.order_quantity - 1,
                    };
                }
                return order;
            });
        });
    }

    function handleRemoveOrder(id: number) {
        setOrders((prev) => {
            return prev.filter((order) => {
                if (order.product.id !== id) {
                    return order;
                }
            });
        });
    }

    function totalPrice(order: Order<Product>): number {
        return order.product.price * order.order_quantity;
    }

    function overAllTotalPrice(orders: Order<Product>[]): number {
        return orders.reduce((total, order) => total + totalPrice(order), 0);
    }

    function amountChange(
        amountRender: number,
        orders: Order<Product>[]
    ): number {
        return amountRender - overAllTotalPrice(orders);
    }

    function handleCreateOrder() {
        const data = {
            orders: orders,
            total: overAllTotalPrice(orders),
            amountRender: parseFloat(amountRender),
            table: table,
        };

        router.post("/orders/create", data, {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
                if (err?.amountRender) {
                    toast.error(err.amountRender);
                }
            },
        });
    }

    function handleProductSearch() {
        const data = {
            search: search,
            category: category,
        };
        router.get("/orders/create", data, {
            replace: true,
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout>
            <Head title="Create Order" />
            <h1 className="text-white text-2xl font-semibold my-2">Products</h1>

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
                            type="button"
                            onClick={() => handleProductSearch()}
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Choose Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.data.map((product) => (
                    <FoodCard
                        key={product.id}
                        onHandleClick={() => addProduct(product)}
                        product={product}
                        label="Add Order"
                    />
                ))}
            </div>
            {products.total > products.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {products.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}

            <h1 className="text-white text-2xl font-semibold my-2">
                Create Order
            </h1>
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
                    {orders.map((order) => (
                        <TableBodyRow key={order.product.id}>
                            <TableBodyRowData>
                                <img
                                    src={order.product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {order.product.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <OrderQuantity
                                    value={order.order_quantity}
                                    onHandleAdd={() =>
                                        handleAdd(order.product.id)
                                    }
                                    onHandleMinus={() =>
                                        handleMinus(order.product.id)
                                    }
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                P{order.product.price}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                P{totalPrice(order).toFixed(2)}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <button
                                    onClick={() =>
                                        handleRemoveOrder(order.product.id)
                                    }
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
            {orders.length > 0 ? (
                <div className="mt-5 text-right space-y-3">
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="text-white text-xl">Table No:</div>
                        <div className="text-white text-xl">
                            <select
                                value={table}
                                onChange={(e) => setTable(e.target.value)}
                                className="text-black px-2 py-1 text-md rounded"
                            >
                                <option value="">Choose Table</option>
                                {tables.map((table) => (
                                    <option key={table.id} value={table.id}>
                                        {table.no}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="text-white text-xl">Total:</div>
                        <div className="text-white text-xl">
                            P{overAllTotalPrice(orders).toFixed(2)}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="text-white text-xl">Change:</div>
                        <div className="text-white text-xl">
                            P
                            {amountChange(
                                parseFloat(amountRender),
                                orders
                            ).toFixed(2) === "NaN"
                                ? 0
                                : amountChange(
                                      parseFloat(amountRender),
                                      orders
                                  ).toFixed(2)}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="text-white text-xl">
                            Amount Rendered:
                        </div>
                        <div>
                            <InputNumber
                                value={amountRender}
                                onHandleChange={(e) =>
                                    setAmountRender(e.target.value)
                                }
                                isWidthFull={false}
                            />
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
            ) : null}
        </AdminLayout>
    );
}

export default OrdersCreate;
