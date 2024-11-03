import Sidebar from "@/components/Sidebar";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="bg-orange p-5 rounded grid grid-cols-1 gap-5">
                        <div className="text-5xl text-white transition hover:scale-125 place-self-end">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div>
                            <p className="text-white text-3xl">150</p>
                            <h3 className="text-white text-xl font-semibold break-all">
                                Orders
                            </h3>
                        </div>
                    </div>
                    <div className="bg-orange p-5 rounded grid grid-cols-1 gap-5">
                        <div className="text-5xl text-white transition hover:scale-125 place-self-end">
                            <i className="fa-solid fa-users-line"></i>
                        </div>
                        <div>
                            <p className="text-white text-3xl">150</p>
                            <h3 className="text-white text-xl font-semibold break-all">
                                Customers
                            </h3>
                        </div>
                    </div>
                    <div className="bg-orange p-5 rounded grid grid-cols-1 gap-5">
                        <div className="text-5xl text-white transition hover:scale-125 place-self-end">
                            <i className="fa-solid fa-person-walking"></i>
                        </div>
                        <div>
                            <p className="text-white text-3xl">150</p>
                            <h3 className="text-white text-xl font-semibold break-all">
                                Staffs
                            </h3>
                        </div>
                    </div>
                    <div className="bg-orange p-5 rounded grid grid-cols-1 gap-5">
                        <div className="text-5xl text-white transition hover:scale-125 place-self-end">
                            <i className="fa-solid fa-person-shelter"></i>
                        </div>
                        <div>
                            <p className="text-white text-3xl">150</p>
                            <h3 className="text-white text-xl font-semibold break-all">
                                Reservation
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
