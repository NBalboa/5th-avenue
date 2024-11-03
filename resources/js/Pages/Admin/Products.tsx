import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import LOGO from "@images/default-pfp.png";
import { useState } from "react";
import Toggle from "@/components/Toggle";
import Table from "@/components/Table";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import Modal from "@/components/Modal";
import ProductModal from "@/components/ProductModal";
import CategoryModal from "@/components/CategoryModal";
import SupplierModal from "@/components/SupplierModal";

function Products() {
    const [check, setCheck] = useState<boolean>(false);
    function handleToggle(value: boolean): void {
        setCheck(!value);
    }

    return (
        <AdminLayout>
            <Head title="Products" />
            <h1 className="text-white text-2xl font-semibold">Products</h1>
            <div className="w-full flex justify-end gap-2">
                <SupplierModal />
                <CategoryModal />
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Image</TableHeadData>
                    <TableHeadData>Name</TableHeadData>
                    <TableHeadData>Category</TableHeadData>
                    <TableHeadData>Quantity</TableHeadData>
                    <TableHeadData>Price</TableHeadData>
                    <TableHeadData>Available</TableHeadData>
                </TableHead>
                <TableBody>
                    <TableBodyRow>
                        <TableBodyRowData isLink={false} to="#">
                            <img
                                src={LOGO}
                                className="object-contain w-full h-[50px]"
                            />
                        </TableBodyRowData>
                        <TableBodyRowData isLink={true} to="#">
                            Chicken Silogasdasdasdasd
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            <Toggle
                                text=""
                                active={check}
                                click={handleToggle}
                            />
                        </TableBodyRowData>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyRowData isLink={false} to="#">
                            <img
                                src={LOGO}
                                className="object-contain w-full h-[50px]"
                            />
                        </TableBodyRowData>
                        <TableBodyRowData isLink={true} to="#">
                            Chicken Silogasdasdasdasd
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            Chicken Silog
                        </TableBodyRowData>
                        <TableBodyRowData isLink={false} to="#">
                            <Toggle
                                text={null}
                                active={check}
                                click={handleToggle}
                            />
                        </TableBodyRowData>
                    </TableBodyRow>
                </TableBody>
            </Table>
            <div className="w-full text-right mt-5 pe-1">
                <ProductModal />
            </div>
        </AdminLayout>
    );
}

export default Products;
