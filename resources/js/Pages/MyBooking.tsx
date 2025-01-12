import FoodCard from "@/components/FoodCard";
import Form from "@/components/Form";
import FormButton from "@/components/FormButton";
import InputNumber from "@/components/InputNumber";
import InputWrapper from "@/components/InputWrapper";
import Label from "@/components/Label";
import OrderQuantity from "@/components/OrderQuantity";
import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import Toggle from "@/components/Toggle";
import getOverAllCartPrice from "@/helpers/getOverAllCartPrice";
import getTotalCartPrice from "@/helpers/getTotalCartPrice";
import UserLayout from "@/Layouts/UserLayout";
import { Cart, Category, PaginatedData, Product, TTable } from "@/Types/types";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

type BookingSearch = {
    search: string;
    category: string;
};

type BookingProps = {
    categories: Category[];
    products: PaginatedData<Product>;
    tables: TTable[];
    filters: BookingSearch;
    carts: Cart[];
};

const MyBooking = ({
    products,
    categories,
    tables,
    filters,
    carts,
}: BookingProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [hasOrder, setHasOrder] = useState<boolean>(
        carts.length > 0 ? true : false
    );
    const [table, setTable] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [noPeople, setNoPeople] = useState<string>("");
    const { errors } = usePage().props;
    const [loading, setLoading] = useState<boolean>(false);

    console.log(carts);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            search: search,
            category: filters.category ?? "",
        };

        router.get("/my/booking", data, {
            replace: true,
            preserveScroll: true,
        });
    };

    const handleAddToCart = (product: Product) => {
        const data = {
            table: table,
            product: product.id,
        };
        router.post("/booking", data, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Added to booking cart successfully");
            },
            onError: () => {
                if (errors.table) {
                    toast.error(errors.table);
                }
                if (errors.exist) {
                    toast.error(errors.exist);
                }
            },
        });
    };

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

    const handleRemoveCart = (cart: Cart) => {
        router.delete(`/cart/${cart.id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Cart deleted successfully");
            },
        });
    };
    return (
        <UserLayout>
            <div className="max-w-lg mx-auto px-14 py-12 border-2 border-white rounded">
                <div className="space-y-3">
                    <h2 className="text-white text-xl font-medium">
                        Create Booking
                    </h2>
                    <Form>
                        <InputWrapper>
                            <Label label="Table No." />
                            <select
                                value={table}
                                onChange={(e) => setTable(e.target.value)}
                                className="px-4 py-2 text-md w-full rounded"
                            >
                                <option value="">Select Table</option>
                                {tables.map((table) => (
                                    <option key={table.id} value={table.id}>
                                        {table.no}
                                    </option>
                                ))}
                            </select>
                        </InputWrapper>
                        <InputWrapper>
                            <Label label="Date" />
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                className="px-4 py-2 text-md w-full rounded"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label label="Time" />
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                type="time"
                                className="px-4 py-2 text-md w-full rounded"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Label label="No. of People" />
                            <InputNumber
                                value={noPeople}
                                onHandleChange={(e) =>
                                    setNoPeople(e.target.value)
                                }
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={hasOrder}
                                    onChange={(e) =>
                                        setHasOrder(e.target.checked)
                                    }
                                    className="px-4 py-2 text-md h-[25px] w-[25px] text-left"
                                />
                                <Label label="Have orders?" />
                            </div>
                        </InputWrapper>
                        <FormButton label="Book Table" />
                    </Form>
                </div>
            </div>

            {hasOrder && carts.length > 0 ? (
                <>
                    <div className="mt-5 text-right space-y-3">
                        <div className="flex flex-row gap-2 items-center justify-end">
                            <div className="text-white text-2xl">Total:</div>
                            <div className="text-white text-2xl">
                                P{getOverAllCartPrice(carts).toFixed(2)}
                            </div>
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
                                        P{cart.product.price}
                                    </TableBodyRowData>
                                    <TableBodyRowData>
                                        P{getTotalCartPrice(cart).toFixed(2)}
                                    </TableBodyRowData>
                                    <TableBodyRowData>
                                        <button
                                            onClick={() =>
                                                handleRemoveCart(cart)
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
                </>
            ) : null}

            {hasOrder ? (
                <>
                    <div>
                        <div className="m-5">
                            <div>
                                <form
                                    onSubmit={handleSearch}
                                    className="text-white relative w-full md:w-[500px] mx-auto my-4 border-4 border-orange rounded-full"
                                >
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full ps-4 py-3 text-black pe-14 rounded-full"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-0 right-0 bottom-0 text-2xl bg-orange px-3 hover:opacity-90 rounded-r-full"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>
                            <div>
                                <div className="w-full mx-auto text-white flex flex-col md:flex-row justify-center border-4 border-gray rounded sm:text-xl md:text-xl font-semibold">
                                    <Link
                                        preserveState={true}
                                        preserveScroll={true}
                                        href="/my/booking"
                                        className={`w-full px-4 py-2 ${
                                            filters.category
                                                ? "hover:bg-orange"
                                                : "bg-orange"
                                        }  text-center`}
                                    >
                                        All
                                    </Link>
                                    {categories.map((category) => (
                                        <Link
                                            preserveState={true}
                                            preserveScroll={true}
                                            href={`/my/booking?category=${
                                                category.id
                                            }${
                                                search
                                                    ? `&search=${search}`
                                                    : "&search="
                                            }`}
                                            key={category.id}
                                            className={`w-full px-4 py-2 ${
                                                filters.category ===
                                                category.id.toString()
                                                    ? "bg-orange"
                                                    : "hover:bg-orange"
                                            } text-center`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="m-5">
                            <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {products.data.map((product) => (
                                    <FoodCard
                                        key={product.id}
                                        product={product}
                                        label="Add to Cart"
                                        onHandleClick={() =>
                                            handleAddToCart(product)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {products.total > products.per_page ? (
                        <div className="w-full text-center mt-5 flex justify-center mt-5">
                            {products.links.map((link, index) => (
                                <PaginatedLinks key={index} link={link} />
                            ))}
                        </div>
                    ) : null}
                </>
            ) : null}
        </UserLayout>
    );
};

export default MyBooking;
