import DashboardCard from "@/components/DashboardCard";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import DashboardCards from "./DashboardCards";
import Select from "@/components/Select";
import Label from "@/components/Label";
import React, { useState } from "react";

type DashboardProps = {
    total_orders: number;
    total_customers: number;
    total_staffs: number;
    total_reservations: number;
    filters: FiltersDashboard;
    sales: Sales;
};

type FiltersDashboard = {
    name_date: string;
};

type Sales = {
    today: number;
    month: number;
    week: number;
    year: number;
};

function Dashboard({
    total_orders,
    total_customers,
    total_staffs,
    total_reservations,
    filters,
    sales,
}: DashboardProps) {
    const handleNamDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const data = {
            name_date: e.target.value,
        };
        router.get("/dashboard", data, {
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="space-y-2">
                <div className="flex flex-col md:w-1/4 gap-2">
                    <Label label="Orders and Reservations" />
                    <Select
                        value={filters.name_date}
                        onHandleChange={(e) => handleNamDateChange(e)}
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </Select>
                </div>
                <DashboardCards>
                    <DashboardCard
                        total={total_orders}
                        label="Orders"
                        icon={<i className="fa-brands fa-bitbucket"></i>}
                    />
                    <DashboardCard
                        total={total_reservations}
                        label="Reservations"
                        icon={<i className="fa-solid fa-book"></i>}
                    />
                    <DashboardCard
                        total={total_customers}
                        label="Customers"
                        icon={<i className="fa-solid fa-users-line"></i>}
                    />
                    <DashboardCard
                        total={total_staffs}
                        label="Staffs"
                        icon={<i className="fa-solid fa-person"></i>}
                    />
                </DashboardCards>
                <h1 className="text-white text-2xl">Sales</h1>
                <DashboardCards>
                    <DashboardCard
                        total={sales.today}
                        label="Today"
                        icon={<i className="fa-solid fa-calendar-week"></i>}
                    />
                    <DashboardCard
                        total={sales.week}
                        label="This Week"
                        icon={<i className="fa-solid fa-calendar-week"></i>}
                    />
                    <DashboardCard
                        total={sales.month}
                        label="This Month"
                        icon={<i className="fa-solid fa-calendar-week"></i>}
                    />
                    <DashboardCard
                        total={sales.year}
                        label="This Year"
                        icon={<i className="fa-solid fa-calendar-week"></i>}
                    />
                </DashboardCards>
            </div>
            <div className="text-right mt-5">
                <a
                    href={`/reports?name_date=${filters.name_date}`}
                    target="_black"
                    className="rounded-md px-4 py-2 border-2 border-white text-white font-medium hover:bg-orange mt-2"
                >
                    Generate Report
                </a>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;
