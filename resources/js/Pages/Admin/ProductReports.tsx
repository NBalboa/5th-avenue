import { Head } from "@inertiajs/react";
import {
    Document,
    Font,
    Image,
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
    logo: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        height: "100px",
        width: "100px",
    },
    logoText: {
        textAlign: "center",
        marginBottom: 15,
        fontSize: 16,
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

type ProductReportsProps = {
    product_sales: ProductSale[];
    date_generated: string;
    logo: string;
};

type ProductSale = {
    quantity: number;
    product: Product;
    logo: string;
};

const ProductReports = ({
    product_sales,
    date_generated,
    logo,
}: ProductReportsProps) => {
    return (
        <div>
            <Head title="Reports" />
            <PDFViewer style={{ height: "100vh", width: "100%" }}>
                <Document>
                    <Page style={styles.page}>
                        <Image style={styles.logo} src={logo} />
                        <Text style={styles.logoText}>
                            5th Avenue Grill and Restobar
                        </Text>
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
                                        Total No. Sales by Volume
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
                        <Text
                            style={styles.pageNumber}
                            render={({ pageNumber, totalPages }) =>
                                `${pageNumber} / ${totalPages}`
                            }
                            fixed
                        />
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default ProductReports;
