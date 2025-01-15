import PaginatedLinks from "@/components/PaginatedLinks";
import Spinner from "@/components/Spinner";
import SupplierModal from "@/components/SupplierModal";
import SupplierTargetModal from "@/components/SupplierTargetModal";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import { PaginatedData, Supplier } from "@/Types/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Suppliers({
    suppliers,
    search,
}: {
    suppliers: PaginatedData<Supplier>;
    search: string;
}) {
    const { data, setData, get, processing } = useForm({
        search: search ?? "",
    });

    const [editModal, setEditModal] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<Supplier>(suppliers.data[0]);

    function handleEdit(supplier: Supplier) {
        setSupplier(supplier);
        setEditModal(true);
    }

    function handleSearch(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        get("/suppliers", {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AdminLayout>
            <Head title="Suppliers" />
            <h1 className="text-white text-2xl">Suppliers</h1>
            <div>
                <div>
                    <form
                        onSubmit={handleSearch}
                        className="text-white relative w-full md:w-[500px] mx-auto my-2 border-4 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            className="w-full ps-4 py-1 text-black pe-14 rounded-full text-sm"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            {processing ? (
                                <Spinner />
                            ) : (
                                <i className="fa-solid fa-magnifying-glass"></i>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Name</TableHeadData>
                    <TableHeadData>Phone</TableHeadData>
                    <TableHeadData>Telephone</TableHeadData>
                    <TableHeadData>Email</TableHeadData>
                    <TableHeadData>Address</TableHeadData>
                </TableHead>
                <TableBody>
                    {suppliers.data?.map((supplier) => (
                        <TableBodyRow key={supplier.id}>
                            <TableBodyRowData
                                click={() => handleEdit(supplier)}
                                isLink={true}
                            >
                                {supplier.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {supplier.phone}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {supplier.telephone}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {supplier.email}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {supplier.address.street},{" "}
                                {supplier.address.barangay},{" "}
                                {supplier.address.city},{" "}
                                {supplier.address.province}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>

            {suppliers.total > suppliers.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {suppliers.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}

            {suppliers.total > suppliers.per_page ? (
                <div className="my-5 text-white w-full text-center space-x-3">
                    {suppliers.links.map((link, index) => (
                        <Link
                            preserveState
                            key={index + 1}
                            href={link.url ? link.url : "#"}
                            className={`${link.url ? "inline" : "hidden"} ${
                                link.active
                                    ? "text-orange"
                                    : "hover:text-orange"
                            } text-md`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    ))}
                </div>
            ) : null}
            <div className="mt-5 w-full text-right">
                <SupplierModal />
            </div>
            <div>
                {supplier ? (
                    <SupplierTargetModal
                        supplier={supplier}
                        setShow={setEditModal}
                        show={editModal}
                    />
                ) : null}
            </div>
        </AdminLayout>
    );
}

export default Suppliers;
