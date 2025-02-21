import Categories from "@/components/Categories";
import Error from "@/components/Error";
import FoodCard from "@/components/FoodCard";
import FoodCards from "@/components/FoodCards";
import Form from "@/components/Form";
import FormButton from "@/components/FormButton";
import Input from "@/components/Input";
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
import formattedTime from "@/helpers/formattedTime";
import getOverAllCartPrice from "@/helpers/getOverAllCartPrice";
import getTotalCartPrice from "@/helpers/getTotalCartPrice";
import UserLayout from "@/Layouts/UserLayout";
import { Cart, Category, PaginatedData, Product, TTable } from "@/Types/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import GCASH from "../../images/gcash.jpg";

type BookingSearch = {
    search: string;
    category: string;
};

type BookingProps = {
    categories: Category[];
    products: PaginatedData<Product>;
    filters: BookingSearch;
    carts: Cart[];
    tables: TTable[];
    datetime: DateTime;
};

type DateTime = {
    date: string;
    time: string;
};
const CreateBooking = ({
    products,
    categories,
    filters,
    carts,
    tables,
    datetime,
}: BookingProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [hasOrder, setHasOrder] = useState<boolean>(
        carts.length > 0 ? true : false
    );
    const [table, setTable] = useState<string>("");
    const [date, setDate] = useState<string>(datetime.date ?? "");
    const [time, setTime] = useState<string>(datetime.time ?? "");
    const [noPeople, setNoPeople] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [gcashReferenceId, setGcashReferenceId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const { errors } = usePage().props;
    const [availableTables, setAvailableTables] = useState<TTable[]>(
        tables ?? []
    );

    console.log(tables);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            search: search,
            category: filters.category ?? "",
            date: date,
            time: time,
        };

        router.get("/create/booking", data, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleAddToCart = (product: Product) => {
        const data = {
            table: table,
            product: product.id,
        };
        router.post("/create/booking", data, {
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

    const handleAddBooking = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            table: table,
            gcash_reference_id: gcashReferenceId,
            image: image,
            date: date,
            time: formattedTime(time),
            no_people: noPeople,
            has_order: hasOrder,
            total: getOverAllCartPrice(carts),
            carts: carts,
        };

        router.post("/booking", data, {
            preserveScroll: true,
            onSuccess: () => {
                setTable("");
                setDate("");
                setTime("");
                setNoPeople("");
                setImage(null);
                setPreview("");
                setGcashReferenceId("");
                if (imageRef?.current && imageRef?.current.value) {
                    imageRef.current.value = "";
                }
            },
            onError: () => {
                console.log(errors);
                if (errors.carts) {
                    toast.error(errors.carts);
                } else if (errors.taken) {
                    toast.error(errors.taken);
                } else {
                    toast.error("Something went wrong");
                }
            },
        });
    };

    const searchAvailableTable = () => {
        const data = {
            date: date,
            time: time,
            search: search,
            category: filters.category ?? "",
        };

        router.get("/create/booking", data, {
            preserveScroll: true,
            replace: true,
            preserveState: false,
            onSuccess: () => {
                toast.success(
                    `${availableTables.length} Table/s is/are vacant`
                );
            },
        });
    };

    return (
        <UserLayout>
            <Head title="Create Booking" />
            <div className="max-w-lg mx-auto px-14 py-12 border-2 border-white rounded">
                <div className="space-y-3">
                    <h2 className="text-white text-xl font-medium">
                        Create Booking
                    </h2>
                    <Form onHandleSubmit={handleAddBooking}>
                        <InputWrapper>
                            <Label label="Date" />
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                className="px-4 py-2 text-md w-full rounded"
                            />
                            {errors.date ? <Error>{errors.date}</Error> : null}
                        </InputWrapper>
                        <InputWrapper>
                            <Label label="Time" />
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                type="time"
                                className="px-4 py-2 text-md w-full rounded"
                            />
                            {errors.time ? <Error>{errors.time}</Error> : null}
                        </InputWrapper>
                        <button
                            type="button"
                            onClick={() => searchAvailableTable()}
                            className="border-2 border-white px-4 py-2 text-white text-md w-full hover:bg-orange"
                        >
                            Search for Available Table
                        </button>
                        <InputWrapper>
                            <Label label="Table No." />
                            <select
                                value={table}
                                onChange={(e) => setTable(e.target.value)}
                                className="px-4 py-2 text-md w-full rounded"
                                disabled={!date || !time}
                            >
                                <option value="">Select Table</option>
                                {availableTables.map((table) => (
                                    <option key={table.id} value={table.id}>
                                        {table.no}
                                    </option>
                                ))}
                            </select>
                            {errors.table ? (
                                <Error>{errors.table}</Error>
                            ) : null}
                        </InputWrapper>

                        <InputWrapper>
                            <Label label="No. of People" />
                            <InputNumber
                                value={noPeople}
                                onHandleChange={(e) =>
                                    setNoPeople(e.target.value)
                                }
                            />
                            {errors.no_people ? (
                                <Error>{errors.no_people}</Error>
                            ) : null}
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
                        {hasOrder ? (
                            <>
                                <InputWrapper>
                                    <Label label="Pay Here" />
                                    <p className="w-full text-md font-bold text-white">
                                        GCASH No: 09753919743
                                    </p>
                                    <img
                                        src={GCASH}
                                        className="h-[400x] w-[200px] mx-auto"
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <Label label="Gcash Reference ID" />
                                    <Input
                                        value={gcashReferenceId}
                                        onHandleChange={(e) =>
                                            setGcashReferenceId(e.target.value)
                                        }
                                    />
                                    {errors.gcash_reference_id ? (
                                        <Error>
                                            {errors.gcash_reference_id}
                                        </Error>
                                    ) : null}
                                </InputWrapper>
                                <InputWrapper>
                                    <Label label="Gcash Screenshot" />
                                    <input
                                        type="file"
                                        ref={imageRef}
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (
                                                e.target.files &&
                                                e.target.files[0]
                                            ) {
                                                const file = e.target.files[0];
                                                setImage(file);
                                                setPreview(
                                                    URL.createObjectURL(file)
                                                );
                                            }
                                        }}
                                        className="w-full rounded bg-white file:px-4 file:py-2 file:mr-2 file:bg-black file:text-white file:border-2 file:border-white hover:file:bg-orange"
                                    />
                                    {errors.image ? (
                                        <Error>{errors.image}</Error>
                                    ) : null}
                                </InputWrapper>
                                <InputWrapper>
                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="object-contain h-[75px] w-[75px] rounded-full"
                                        />
                                    ) : null}
                                </InputWrapper>
                            </>
                        ) : null}

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
                                        className="w-full ps-4 py-1 text-black pe-14 rounded-full"
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
                                <Categories>
                                    <Link
                                        preserveState={true}
                                        preserveScroll={true}
                                        replace={true}
                                        href={`/create/booking?category=&date=&search=&time=`}
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
                                            replace={true}
                                            href={`/create/booking?category=${category.id}&date=${date}&search=${search}&time=${time}`}
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
                                </Categories>
                            </div>
                        </div>

                        <div className="m-5">
                            <FoodCards>
                                {products.data.map((product) => (
                                    <FoodCard
                                        showBuyButton={false}
                                        key={product.id}
                                        product={product}
                                        label="Add to Cart"
                                        onHandleClick={() =>
                                            handleAddToCart(product)
                                        }
                                    />
                                ))}
                            </FoodCards>
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

export default CreateBooking;
