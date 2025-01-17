import Categories from "@/components/Categories";
import FoodCard from "@/components/FoodCard";
import FoodCards from "@/components/FoodCards";
import PaginatedLinks from "@/components/PaginatedLinks";
import UserLayout from "@/Layouts/UserLayout";
import { Category, PaginatedData, Product, TTable } from "@/Types/types";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
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

type SetOrders = {
    product: Product;
    order_quantity: number;
};

const MenuOrder = ({
    table,
    products,
    categories,
    filters,
}: MenuOrderProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [loading, setLoading] = useState<boolean>(false);
    const [availableProducts, setAvailableProducts] = useState<
        SetOrders[] | []
    >(
        products
            ? products.data.map((product) => ({
                  product: product,
                  order_quantity: 1,
              }))
            : []
    );
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

    const handleAddToCart = (table_id: number, order: SetOrders): void => {
        setLoading(true);

        const data = {
            table: table_id,
            product: order.product.id,
            quantity: order.order_quantity,
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
    const handleAddQuantity = (product: SetOrders) => {
        setAvailableProducts((prev) => {
            return prev.map((order) => {
                if (order.product.id === product.product.id) {
                    if (
                        product.product.quantity &&
                        order.order_quantity >= product.product.quantity
                    ) {
                        order.order_quantity = product.product.quantity;
                        return order;
                    }
                    order.order_quantity += 1;
                    return order;
                }
                return order;
            });
        });
    };

    const handleMinusQuantity = (product: SetOrders) => {
        setAvailableProducts((prev) => {
            return prev.map((order) => {
                if (order.product.id === product.product.id) {
                    if (product.product.quantity && order.order_quantity > 1) {
                        order.order_quantity -= 1;
                        return order;
                    }
                    order.order_quantity = 1;
                    return order;
                }
                return order;
            });
        });
    };
    const handleQuantity = (
        e: React.ChangeEvent<HTMLInputElement>,
        product: SetOrders
    ) => {
        setAvailableProducts((prev) => {
            return prev.map((order) => {
                if (order.product.id === product.product.id) {
                    if (parseInt(e.target.value) > 0) {
                        if (
                            product.product.quantity &&
                            parseInt(e.target.value) >= product.product.quantity
                        ) {
                            order.order_quantity = product.product.quantity;
                            return order;
                        }
                        order.order_quantity = parseInt(e.target.value);
                        return order;
                    } else {
                        order.order_quantity = 1;
                        return order;
                    }
                }
                return order;
            });
        });
    };

    const handleBuyNow = (order: SetOrders) => {
        const data = {
            table: table.id,
            quantity: order.order_quantity,
        };

        router.post(`/orders/buy/${order.product.id}`, data, {
            preserveScroll: true,
        });
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
                        <Categories>
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
                        </Categories>
                    </div>
                </div>

                <div className="m-5">
                    <FoodCards>
                        {availableProducts.map((product) => (
                            <FoodCard
                                showQuantity={true}
                                key={product.product.id}
                                product={product.product}
                                value={product.order_quantity}
                                onHandleMinus={() =>
                                    handleMinusQuantity(product)
                                }
                                onHandleQuantity={(e) =>
                                    handleQuantity(e, product)
                                }
                                label="Add to Cart"
                                onHandleAdd={() => handleAddQuantity(product)}
                                onHandleClick={() =>
                                    handleAddToCart(table.id, product)
                                }
                                onHandleBuyNow={() => handleBuyNow(product)}
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
        </UserLayout>
    );
};

export default MenuOrder;
