import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import transformData from "@/helpers/transformData";
import UserLayout from "@/Layouts/UserLayout";
import { Cart } from "@/Types/types";
import { Head, Link } from "@inertiajs/react";

type CartsProps = {
    carts: [];
};

const Carts = ({ carts }: CartsProps) => {
    const datas = transformData(carts);
    return (
        <UserLayout>
            <Head title="Cart" />
            <Table>
                <TableHead>
                    <TableHeadData>Table No.</TableHeadData>
                    <TableHeadData>No. of Items</TableHeadData>
                    <TableHeadData></TableHeadData>
                    <TableHeadData></TableHeadData>
                </TableHead>
                <TableBody>
                    {datas.map((data, index) => (
                        <TableBodyRow key={index}>
                            <TableBodyRowData>{data.table}</TableBodyRowData>
                            <TableBodyRowData>
                                {data.total_items}
                            </TableBodyRowData>

                            <TableBodyRowData>
                                <Link
                                    href={`/cart/checkout/table/${data.table}`}
                                    className="border-2 text-white px-4 py-2 hover:bg-orange rounded-lg"
                                >
                                    Proceed to Checkout
                                </Link>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <Link
                                    href={`/menus/order/tables/${data.table}`}
                                    className="border-2 text-white px-4 py-2 hover:bg-orange rounded-lg"
                                >
                                    Continue to Order
                                </Link>
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </UserLayout>
    );
};

export default Carts;
