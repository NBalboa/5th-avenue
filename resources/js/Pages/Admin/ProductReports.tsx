import { Head } from "@inertiajs/react";
import {
    Document,
    Font,
    Page,
    PDFViewer,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import Roboto from "../../../fonts/Roboto-Regular.ttf";
import { Product } from "@/Types/types";
Font.register({
    family: "Roboto",
    src: Roboto,
});
const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: "Roboto",
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
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
    section: {
        marginBottom: 20,
    },
});

type ProductReportsProps = {
    product_sales: ProductSale[];
    date_generated: string;
};

type ProductSale = {
    quantity: number;
    product: Product;
};

const ProductReports = ({
    product_sales,
    date_generated,
}: ProductReportsProps) => {
    return (
        <div>
            <Head title="Reports" />
            <PDFViewer style={{ height: "100vh", width: "100%" }}>
                <Document>
                    <Page style={styles.page}>
                        <View>
                            <Text style={styles.label}>
                                Date Generated: {date_generated}
                            </Text>
                        </View>
                        <Text style={styles.section}>Products</Text>
                        <View style={styles.table}>
                            <View style={[styles.tableRow, styles.tableHeader]}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Name</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        Total No. Sales
                                    </Text>
                                </View>
                            </View>
                            {product_sales.map((product_sale) => (
                                <View
                                    style={styles.tableRow}
                                    key={product_sale.product.id}
                                >
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            {product_sale.product.name}
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>
                                            {product_sale.quantity}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ProductReports;
