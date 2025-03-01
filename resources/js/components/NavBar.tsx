import { useState } from "react";
import Logo from "@images/5th_avenue_logo.png";
import NavLink from "@/components/NavLink";
import { Link, router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import MenuLink from "./MenuLink";

type NavBarProps = {
    isHideLogo?: boolean;
};

function NavBar({ isHideLogo = false }: NavBarProps) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { component } = usePage();
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post("/logout", {});
    };

    return (
        <div className="max-w-7xl mx-auto">
            <nav className="relative flex justify-between items-center text-white py-5 mx-5 gap-5">
                <div
                    className={`${
                        isHideLogo
                            ? "invisible"
                            : "flex flex-col items-center p-2"
                    }`}
                >
                    <a
                        href="#"
                        className="rounded-full m-5 hidden sm:hidden md:inline-block"
                    >
                        <img
                            src={Logo}
                            className="w-[75px] h-[75px] rounded-full hover:border-4 border-orange"
                        />
                    </a>
                    <h1 className="text-md text-center sm:text-sm md:text-2xl font-semibold hover:text-orange">
                        <a href="#">5th Avenue Grill and Restobar </a>
                    </h1>
                </div>
                <ul className="flex items-center text-lg gap-3 ">
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
                            <NavLink
                                path="/login"
                                isActive={"Login" === component}
                            >
                                Login
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                path="/cart"
                                isActive={"Carts" === component}
                            >
                                Cart
                            </NavLink>
                            <NavLink
                                path="/my/orders"
                                isActive={"MyOrders" === component}
                            >
                                Orders
                            </NavLink>
                            <Link
                                preserveScroll={true}
                                href="/my/booking"
                                className="border-2 text-white px-4 py-2 hover:bg-orange hidden md:block"
                            >
                                Reservation
                            </Link>

                            <button
                                onClick={() => handleLogout()}
                                className="border-2 text-white px-4 py-2 hover:bg-orange"
                            >
                                Logout
                            </button>
                        </>
                    )}

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
                    <MenuLink
                        to="/"
                        label="Home"
                        active={"Welcome" === component}
                    />
                    <MenuLink
                        to="/menus"
                        label="Menu"
                        active={"Menus" === component}
                    />
                    {!auth ? (
                        <>
                            <MenuLink
                                to="/register"
                                label="Register"
                                active={"Register" === component}
                            />
                            <MenuLink
                                to="/login"
                                label="Login"
                                active={"Login" === component}
                            />
                        </>
                    ) : (
                        <>
                            <MenuLink
                                to="/cart"
                                label="Cart"
                                active={"Carts" === component}
                            />

                            <MenuLink
                                to="/my/orders"
                                label="Orders"
                                active={"MyOrders" === component}
                            />
                            <Link
                                preserveScroll={true}
                                href="/my/booking"
                                className="border-2 text-center text-white px-4 py-2 hover:bg-orange"
                            >
                                Reservation
                            </Link>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
