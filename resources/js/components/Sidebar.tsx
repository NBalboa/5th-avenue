import { useState } from "react";
import DefaultProfile from "@images/default-pfp.png";
import SidebarLink from "./SidebarLink";
import { usePage } from "@inertiajs/react";

function Sidebar() {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const { component } = usePage();
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
                        <i className="fa-solid fa-bars"></i>
                    ) : (
                        <i className="fa-solid fa-xmark"></i>
                    )}
                </button>
            </nav>
            <aside
                className={`fixed ${
                    showSidebar ? "-translate-x-full" : "translate-x-0"
                } transition ease-in  md:translate-x-0 top-0 z-30 w-64 h-screen border-r-2 border-orange mt-12 py-14 px-4 bg-black `}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="grid grid-cols-3 items-center gap-4 border-b-2 border-white pb-4">
                        <img
                            src={DefaultProfile}
                            className="object-fit w-full col-span-1"
                        />
                        <div className="col-span-2">
                            <h3 className="text-white max-text-xl">
                                John Nigel Sipe
                            </h3>
                            <span className="text-gray max-text-md">Admin</span>
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
                            active={"Admin/Products" === component}
                            to="/products"
                        >
                            Products
                        </SidebarLink>
                    </ul>
                    <button className="w-full text-xl text-white px-4 py-2 border-2 border-white rounded hover:bg-orange">
                        Logout
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
