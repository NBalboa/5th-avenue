import MyDocument from "@/components/MyDocument";
import { Booking, TOrder } from "@/Types/types";
import { Head } from "@inertiajs/react";
import { PDFViewer } from "@react-pdf/renderer";

type ReportProps = {
    total_orders: number;
    total_customers: number;
    total_staffs: number;
    total_reservations: number;
    filters: FiltersDashboard;
    sales: Sales;
    orders: TOrder[];
    bookings: Booking[];
    sales_date: SalesDate;
    date_generated: string;
    logo: string;
};

type SalesDate = {
    today: string;
    month: string;
    week: Week;
    year: string;
};

type Week = {
    start: string;
    end: string;
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

const Reports = ({
    total_orders,
    total_customers,
    total_staffs,
    total_reservations,
    sales,
    filters,
    orders,
    bookings,
    sales_date,
    date_generated,
    logo,
}: ReportProps) => {
    return (
        <div>
            <Head title="Reports" />

            <PDFViewer style={{ height: "100vh", width: "100%" }}>
                <MyDocument
                    total_reservations={total_reservations}
                    total_customers={total_customers}
                    total_orders={total_orders}
                    total_staffs={total_staffs}
                    sales={sales}
                    filters={filters}
                    orders={orders}
                    bookings={bookings}
                    sales_date={sales_date}
                    date_generated={date_generated}
                    logo={logo}
                />
            </PDFViewer>
        </div>
    );
};

export default Reports;
