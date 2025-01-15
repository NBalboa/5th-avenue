import { useState } from "react";
import DefaultProfile from "@images/default-pfp.png";
import SidebarLink from "./SidebarLink";
import { router, usePage } from "@inertiajs/react";
import getUserRoleString from "@/helpers/getUserRoleString";
import { User } from "@/Types/types";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

function Sidebar() {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const { component } = usePage();
    const { auth } = usePage().props;
    if (!auth) {
        router.get("/");
    }
    const handleLogout = () => {
        router.post("/logout", {});
    };

    return (
        <div>
            <nav className="fixed top-0 bg-black z-40 w-full flex justify-between border-b-2 border-orange px-4 py-3 items-center">
                <h1 className="text-white font-semibold text-lg sm:text-xl  md:text-2xl">
                    5th Avenue Grill and Restobar
                </h1>
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-white text-xl md:text-2xl hover:text-orange md:hidden"
                >
                    {showSidebar ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-bars"></i>
                    )}
                </button>
            </nav>
            <aside
                className={`fixed ${
                    showSidebar ? "translate-x-0" : "-translate-x-full"
                } transition ease-in   md:translate-x-0 top-0 z-30 w-64 h-screen border-r-2 border-orange mt-12 py-14 px-4 bg-black `}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="grid grid-cols-3 items-center gap-4 border-b-2 border-white pb-4">
                        <img
                            src={DefaultProfile}
                            className="object-fit w-full col-span-1"
                        />
                        <div className="col-span-2">
                            {auth ? (
                                <>
                                    <h3 className="text-white max-text-xl">
                                        {auth.first_name} {auth.last_name}
                                    </h3>
                                    <span className="text-gray max-text-md">
                                        {getUserRoleString(auth.role)}
                                    </span>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <ul className="overflow-y-auto pr-3 h-96">
                        <SidebarLink
                            active={"Admin/Dashboard" === component}
                            to="/dashboard"
                        >
                            Dashboard
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Orders" === component}
                            to="/orders"
                        >
                            Orders
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/OnlineOrder" === component}
                            to="/online/orders"
                        >
                            Online Orders
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Bookings" === component}
                            to="/bookings"
                        >
                            Bookings
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Products" === component}
                            to="/products"
                        >
                            Products
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Suppliers" === component}
                            to="/suppliers"
                        >
                            Suppliers
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Categories" === component}
                            to="/categories"
                        >
                            Category
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Tables" === component}
                            to="/tables"
                        >
                            Tables
                        </SidebarLink>
                        <SidebarLink
                            active={"Admin/Stocks" === component}
                            to="/stocks"
                        >
                            Stocks
                        </SidebarLink>
                    </ul>
                    <button
                        onClick={() => handleLogout()}
                        className="w-full text-xl text-white px-4 py-2 border-2 border-white rounded hover:bg-orange"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
