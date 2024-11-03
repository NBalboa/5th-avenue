import NavBar from "@/components/NavBar";
import ImageOne from "@images/1.jpg";
import ImageTwo from "@images/2.jpg";
import ImageThree from "@images/3.jpg";
import ImageFour from "@images/4.jpg";
import ImageFive from "@images/5.jpg";
import ImageSix from "@images/6.jpg";
import ImageEight from "@images/8.jpg";
import ImageNine from "@images/9.jpg";
import ImageTen from "@images/10.jpg";
import { useState } from "react";
import Title from "@/components/Title";
import FoodCard from "@/components/FoodCard";
import MAP from "@images/map.jpg";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

function Welcome() {
    const [showImage, setShowImage] = useState<number>(1);

    function handlePreviousImage(): void {
        if (showImage == 1) {
            setShowImage(10);
        } else {
            setShowImage(showImage - 1);
        }
    }

    function handleNextImage(): void {
        if (showImage == 10) {
            setShowImage(1);
        } else {
            setShowImage(showImage + 1);
        }
    }

    return (
        <UserLayout>
            <Head title="Home" />
            <div className="m-5 relative">
                <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-5">
                    <img
                        src={ImageOne}
                        className={`w-full ${
                            showImage === 1 ? "block" : "hidden"
                        } h-[400px] sm:block md:h-full sm:h-[200px] sm:col-span-2 md:row-span-2 md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageTwo}
                        className={`w-full  ${
                            showImage === 2 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageThree}
                        className={`w-full ${
                            showImage === 3 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageFour}
                        className={`w-full ${
                            showImage === 4 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] sm:col-span-2 md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageFive}
                        className={`w-full ${
                            showImage === 5 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] sm:col-span-2 md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageSix}
                        className={`w-full ${
                            showImage === 6 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageEight}
                        className={`w-full ${
                            showImage === 7 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] md:col-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageTen}
                        className={`w-full ${
                            showImage === 8 ? "block" : "hidden"
                        } h-[400px] sm:block md:h-full sm:h-[200px] sm:col-span-2 md:col-span-2 md:row-span-2 rounded-lg`}
                    />
                    <img
                        src={ImageNine}
                        className={`w-full ${
                            showImage === 9 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px] sm:col-span-2  md:col-span-2  rounded-lg`}
                    />
                    <img
                        src={ImageEight}
                        className={`w-full ${
                            showImage === 10 ? "block" : "hidden"
                        } h-[400px] sm:block sm:h-[200px]  md:col-span-2 rounded-lg`}
                    />
                </div>
                <button
                    onClick={() => handlePreviousImage()}
                    className="absolute left-2 top-[185px] sm:hidden left-0 px-4 py-2 text-white bg-orange rounded-lg opacity-40 hover:opacity-100"
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                    onClick={() => handleNextImage()}
                    className="absolute right-2 top-[185px] sm:hidden px-4 py-2 text-white bg-orange rounded-lg opacity-20 hover:opacity-100"
                >
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            <div className="m-5">
                <Title>About</Title>
                <p className="text-2xl font-medium text-white text-center tracking-wide">
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
                    <form className="text-white relative w-full md:w-[500px] mx-auto my-4 border-4 border-orange rounded-full">
                        <input
                            type="text"
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
                        <button className="w-full px-4 py-2 bg-orange">
                            All
                        </button>
                        <button className="w-full px-4 py-2 hover:bg-orange">
                            Foods
                        </button>
                        <button className="w-full px-4 py-2 hover:bg-orange">
                            Drinks
                        </button>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                </div>
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
