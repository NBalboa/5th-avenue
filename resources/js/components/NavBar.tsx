import { useState } from "react";
import Logo from "@images/5th_avenue_logo.png";
import NavLink from "@/components/NavLink";
import { router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

function NavBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { component } = usePage();
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post("/logout", {});
    };
    return (
        <nav className="relative flex justify-between items-center text-white py-5 mx-5 gap-5">
            <h1 className="text-md sm:text-xl md:text-2xl font-semibold hover:text-orange">
                <a href="#">5th Avenue Grill and Restobar </a>
            </h1>
            <a
                href="#"
                className="rounded-full m-5 hidden sm:hidden md:inline-block"
            >
                <img
                    src={Logo}
                    className="w-[75px] h-[75px] rounded-full hover:border-4 border-orange"
                />
            </a>
            <ul className="flex items-center text-lg gap-3 me-4">
                <NavLink path="/" isActive={"Welcome" === component}>
                    Home
                </NavLink>
                <NavLink
                    path="/menus"
                    isActive={
                        "Menus" === component || "MenuOrder" === component
                    }
                >
                    Menu
                </NavLink>
                {!auth ? (
                    <>
                        <NavLink
                            path="/register"
                            isActive={"Register" === component}
                        >
                            Register
                        </NavLink>
                        <NavLink path="/login" isActive={"Login" === component}>
                            Login
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink path="/cart" isActive={"Carts" === component}>
                            Cart
                        </NavLink>
                        <button
                            onClick={() => handleLogout()}
                            className="border-2 text-white px-4 py-2 hover:bg-orange"
                        >
                            Logout
                        </button>
                    </>
                )}
                <button className="border-2 text-white px-4 py-2 hover:bg-orange">
                    Reservation
                </button>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-2xl block md:hidden hover:text-orange"
                >
                    {showMenu ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-bars"></i>
                    )}
                </button>
            </ul>
            <ul
                className={`${
                    showMenu ? "block" : "hidden"
                } bg-black z-50 flex flex-col gap-4 absolute -top-2 translate-y-24 w-full py-4 px-2 md:hidden text-xl`}
            >
                <li>
                    <img src={Logo} className="w-[50px] h-[50px]" />
                </li>
                <li>
                    <a href="#" className="p-2 text-orange w-full block">
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="/menus"
                        className="p-2 hover:border-b-2 hover:border-orange w-full block"
                    >
                        Menu
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="p-2 hover:border-b-2 hover:border-orange w-full block"
                    >
                        Register
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="p-2 hover:border-b-2 hover:border-orange w-full block"
                    >
                        Login
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
