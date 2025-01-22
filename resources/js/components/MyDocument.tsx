import { Booking, TOrder } from "@/Types/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

type MyDocumentProps = {
    total_orders: number;
    total_customers: number;
    total_staffs: number;
    total_reservations: number;
    filters: FiltersDashboard;
    sales: Sales;
    orders: TOrder[];
    bookings: Booking[];
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

const MyDocument = ({
    total_orders,
    total_customers,
    total_staffs,
    total_reservations,
    sales,
    filters,
    orders,
    bookings,
}: MyDocumentProps) => {
    console.log(bookings);
    return (
        <Document>
            <Page style={styles.page}>
                {/* Filters Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>
                        Orders and Reservations:{" "}
                        {filters.name_date.toUpperCase()}
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
                <Text style={styles.section}>Sales</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>Today</Text>
                        <Text style={styles.cardTotal}>{sales.today}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Week</Text>
                        <Text style={styles.cardTotal}>{sales.week}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Month</Text>
                        <Text style={styles.cardTotal}>{sales.month}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardLabel}>This Year</Text>
                        <Text style={styles.cardTotal}>{sales.year}</Text>
                    </View>
                </View>
                {/* Orders */}

                <Text style={styles.section}>Orders</Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Order ID</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Customer Name</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Confirmed</Text>
                        </View>
                    </View>
                    {orders.map((order) => (
                        <View style={styles.tableRow} key={order.id}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{order.id}</Text>
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
                        </View>
                    ))}
                </View>

                <Text style={styles.section}>Bookings</Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Booking ID</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Table No.</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Customer Name</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Confirmed</Text>
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
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Helvetica",
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
});

export default MyDocument;
