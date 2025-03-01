import ImageOne from "@images/1.jpg";
import ImageTwo from "@images/2.jpg";
import ImageThree from "@images/2.jpg";
import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import FoodCard from "@/components/FoodCard";
import MAP from "@images/map.jpg";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Category, Product } from "@/Types/types";
import toast from "react-hot-toast";
import ImageCarousel from "@/components/ImageCarousel";
import LOGO from "@images/5th_avenue_logo.png";
import FoodCards from "@/components/FoodCards";
import Categories from "@/components/Categories";

type WelcomeProductSearch = {
    search: string;
    category: string;
};
type WelcomeProps = {
    products: Product[];
    categories: Category[];
    filters: WelcomeProductSearch;
};
function Welcome({ products, categories, filters }: WelcomeProps) {
    const [showImage, setShowImage] = useState<number>(1);
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [quantity, setQuantity] = useState<string>("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const data = {
            search: search,
            category: filters.category ?? "",
        };
        router.get("/", data, {
            preserveScroll: true,
        });
    }

    function handlePreviousImage(): void {
        if (showImage == 1) {
            setShowImage(3);
        } else {
            setShowImage(showImage - 1);
        }
    }

    function handleNextImage(): void {
        console.log("Handle Next Image");
        if (showImage == 3) {
            setShowImage(1);
        } else {
            setShowImage(showImage + 1);
        }
    }

    function handleAddToCart() {
        toast.error("Scan QR Code to make an Order");
    }

    function handleBuyNow() {
        toast.error("Scan QR Code to buy now");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setShowImage((prev) => (prev === 3 ? 1 : prev + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <UserLayout isHideLogo={true}>
            <Head title="Home" />
            <div className="flex items-center flex-col md:flex-row justify-evenly gap-5">
                <div>
                    <img src={LOGO} className="h-[300px] w-[300px]" />
                    <h1 className="text-white text-center text-2xl">
                        5th Avenue Grill and Restobar
                    </h1>
                </div>
                <div className="m-5 relative">
                    <ImageCarousel
                        src={ImageOne}
                        currentId={showImage}
                        id={1}
                    />
                    <ImageCarousel
                        src={ImageTwo}
                        currentId={showImage}
                        id={2}
                    />
                    <ImageCarousel
                        src={ImageTwo}
                        currentId={showImage}
                        id={3}
                    />
                    <div className="absolute top-0 left-0 bottom-0  flex justify-between w-full">
                        <button
                            onClick={() => handlePreviousImage()}
                            className="text-white"
                        >
                            <i className="ms-2 fa-solid fa-arrow-left px-8 py-4  bg-orange rounded-lg opacity-40 hover:opacity-100"></i>
                        </button>
                        <button
                            onClick={() => handleNextImage()}
                            className="text-white"
                        >
                            <i className="me-2 fa-solid fa-arrow-right  px-8 py-4 bg-orange rounded-lg opacity-20 hover:opacity-100"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <Title>About</Title>
                <p className="text-xl font-medium text-white text-center tracking-wide">
                    <span className="text-gray  italic">
                        5th Avenue Grill and Restobar
                    </span>{" "}
                    brings{" "}
                    <span className="text-orange">
                        a fresh, vibrant dining experience{" "}
                    </span>
                    to the heart of our community. With a{" "}
                    <span className="text-orange">
                        unique blend of classic and modern flavors
                    </span>
                    , our menu is crafted to{" "}
                    <span className="text-orange">satisfy every palate</span>
                    —from{" "}
                    <span className="text-orange">
                        signature grilled dishes
                    </span>{" "}
                    to <span className="text-orange">creative cocktails</span>.
                    Whether you're looking to enjoy{" "}
                    <span className="text-orange">
                        a night out with friends
                    </span>
                    , a <span className="text-orange">cozy dinner</span>, or a{" "}
                    <span className="text-orange">
                        lively atmosphere with live music
                    </span>
                    ,{" "}
                    <span className="text-gray italic">
                        5th Avenue offers the perfect ambiance
                    </span>
                    . Join us and savor the essence of{" "}
                    <span className="text-orange">
                        good food, great company, and unforgettable moments!
                    </span>
                </p>
            </div>
            <div className="m-5">
                <Title>Menu</Title>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="text-white relative w-full md:w-[500px] mx-auto my-4 border-4 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full ps-2 py-1 text-black pe-14 rounded-full"
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
                            href="/"
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
                                href={`/?category=${category.id}`}
                                key={category.id}
                                className={`w-full px-4 py-2 ${
                                    filters.category === category.id.toString()
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
                    {products.map((product) => (
                        <FoodCard
                            key={product.id}
                            product={product}
                            label="Add to Cart"
                            onHandleClick={() => handleAddToCart()}
                            onHandleBuyNow={() => handleBuyNow()}
                        />
                    ))}
                </FoodCards>
            </div>
            <div className="m-5">
                <Title>Location</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <div>
                        <div className="text-white flex justify-between border-b-2 border-orange mb-2">
                            <h2 className="text-xl font-bold align-middle">
                                Contact No.
                            </h2>
                            <p className="text-2xl font-semibold">
                                09123456789
                            </p>
                        </div>
                        <div className="text-white flex justify-between border-b-2 border-orange gap-2 mb-2 pb-2">
                            <h2 className="text-xl font-bold">Address</h2>
                            <p className="text-end text-xl font-semibold">
                                Yanco Street, Molave Zamboanga Del Sur, Molave,
                                Philippines
                            </p>
                        </div>
                        <div className="text-white flex justify-between gap-2">
                            <h2 className="text-xl font-bold">Social Media</h2>
                            <ul className="text-white">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white text-2xl hover:text-orange"
                                    >
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img
                        src={MAP}
                        className="mx-auto rounded-lg object-contain"
                    />
                </div>
            </div>
        </UserLayout>
    );
}

export default Welcome;
