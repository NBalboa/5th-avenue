import MyDocument from "@/components/MyDocument";
import { TOrder } from "@/Types/types";
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
                />
            </PDFViewer>
        </div>
    );
};

export default Reports;
