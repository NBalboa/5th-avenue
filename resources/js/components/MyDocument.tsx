import priceFormatter from "@/helpers/priceFormatter";
import { Booking, TOrder } from "@/Types/types";
import {
    Document,
    Font,
    G,
    Image,
    Page,
    Path,
    StyleSheet,
    Svg,
    Text,
    View,
} from "@react-pdf/renderer";

import Roboto from "../../fonts/Roboto-Regular.ttf";

Font.register({
    family: "Roboto",
    src: Roboto,
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Roboto",
    },
    logo: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        height: "100px",
        width: "100px",
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "space-between",
        marginBottom: 20,
    },
    card: {
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
        width: "48%",
        textAlign: "center",
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardTotal: {
        fontSize: 16,
        marginTop: 5,
    },
    table: {
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ccc",
        flex: 1,
        padding: 5,
    },
    tableHeader: {
        backgroundColor: "#f2f2f2",
        fontWeight: "bold",
    },
    tableCell: {
        fontSize: 10,
    },

    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

type MyDocumentProps = {
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

type FiltersDashboard = {
    name_date: string;
};

type Sales = {
    today: number;
    month: number;
    week: number;
    year: number;
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

const MyDocument = ({
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
}: MyDocumentProps) => {
    return (
        <Document>
            <Page style={styles.page} size={"A4"}>
                <Image style={styles.logo} src={logo} />
                <View>
                    <Text style={styles.label}>
                        Date Generated: {date_generated}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>
                        Orders and Reservations:{" "}
                        {filters.name_date.toUpperCase()}{" "}
                        {filters.name_date === "today"
                            ? `(${sales_date.today})`
                            : null}
                        {filters.name_date === "week"
                            ? `(${sales_date.week.start} - ${sales_date.week.end})`
                            : null}
                        {filters.name_date === "month"
                            ? `(${sales_date.month})`
                            : null}
                        {filters.name_date === "year"
                            ? `(${sales_date.year})`
                            : null}
                    </Text>
                </View>

                {/* Orders and Reservations Cards */}
                <View style={styles.section}>
                    <View style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Text style={styles.cardLabel}>Orders</Text>
                            <Text style={styles.cardTotal}>{total_orders}</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardLabel}>Reservations</Text>
                            <Text style={styles.cardTotal}>
                                {total_reservations}
                            </Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardLabel}>Customers</Text>
                            <Text style={styles.cardTotal}>
                                {total_customers}
                            </Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardLabel}>Staffs</Text>
                            <Text style={styles.cardTotal}>{total_staffs}</Text>
                        </View>
                    </View>
                </View>

                {/* Sales Section */}
                <Text style={styles.section}>Sales (in Peso)</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Today</Text>
                        <Text style={styles.cardTotal}>
                            {priceFormatter(sales.today)}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Week</Text>
                        <Text style={styles.cardTotal}>
                            {priceFormatter(sales.week)}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Month</Text>
                        <Text style={styles.cardTotal}>
                            {priceFormatter(sales.month)}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Year</Text>
                        <Text style={styles.cardTotal}>
                            {priceFormatter(sales.year)}
                        </Text>
                    </View>
                </View>
                {/* Orders */}
                <View break>
                    <Text style={styles.section}>Orders</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Order ID</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    Customer Name
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Confirmed</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Remarks</Text>
                            </View>
                        </View>
                        {orders.map((order) => (
                            <View style={styles.tableRow} key={order.id}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {order.id}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {order.customer
                                            ? `${order.customer.first_name} ${order.customer.last_name}`
                                            : null}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {order.cashier
                                            ? `${order.cashier.first_name} ${order.cashier.last_name}`
                                            : null}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {order.customer === null &&
                                        order.cashier !== null
                                            ? "Walk-in"
                                            : null}
                                        {order.customer !== null &&
                                        order.cashier === null
                                            ? "Pending"
                                            : null}
                                        {order.customer !== null &&
                                        order.cashier !== null
                                            ? "Paid"
                                            : null}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View break>
                    <Text style={styles.section}>Reservations</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Booking ID</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Table No.</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>
                                    Customer Name
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Confirmed</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Remarks</Text>
                            </View>
                        </View>
                        {bookings.map((booking) => (
                            <View style={styles.tableRow} key={booking.id}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {booking.id}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {booking.table.no}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {booking.user
                                            ? `${booking.user.first_name} ${booking.user.last_name}`
                                            : null}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {booking.confirmed
                                            ? `${booking.confirmed.first_name} ${booking.confirmed.last_name}`
                                            : null}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        Approved
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );
};

export default MyDocument;
