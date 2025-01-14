import FoodCard from "@/components/FoodCard";
import PaginatedLinks from "@/components/PaginatedLinks";
import UserLayout from "@/Layouts/UserLayout";
import { Category, PaginatedData, Product, TTable } from "@/Types/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

type MenuOrderFilters = {
    category: string;
    search: string;
};

type MenuOrderProps = {
    table: TTable;
    products: PaginatedData<Product>;
    categories: Category[];
    filters: MenuOrderFilters;
};

const MenuOrder = ({
    table,
    products,
    categories,
    filters,
}: MenuOrderProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const data = {
            search: search,
            category: filters.category ?? "",
        };

        router.get(`/menus/order/tables/${table.id}`, data, {
            preserveScroll: true,
            replace: true,
        });
    };

    const handleAddToCart = (table_id: number, product_id: number): void => {
        setLoading(true);

        const data = {
            table: table_id,
            product: product_id,
        };
        if (!loading) {
            toast("Adding to cart...", {
                icon: "⏳",
                duration: 1000,
            });
            router.post("/cart", data, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Product added to cart");
                },
                onError: (err) => {
                    if (err.exist) {
                        toast.error(err.exist);
                    } else {
                        toast.error("Something went wrong");
                    }
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };
    return (
        <UserLayout>
            <Head title="Menus" />
            <div>
                <div className="m-5">
                    {/* <Title>Menu</Title> */}
                    <div>
                        <form
                            onSubmit={handleSearch}
                            className="text-white relative w-full md:w-[500px] mx-auto my-4 border-4 border-orange rounded-full"
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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
                                preserveScroll={true}
                                href={`/menus/order/tables/${table.id}`}
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
                                    preserveScroll={true}
                                    href={`/menus/order/tables/${table.id}?category=${category.id}`}
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
                                    handleAddToCart(table.id, product.id)
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
        </UserLayout>
    );
};

export default MenuOrder;
