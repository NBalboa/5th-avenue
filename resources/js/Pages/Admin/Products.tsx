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

function Products() {
    const [check, setCheck] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [byQuantity, setByQuantity] = useState<boolean>(true);
    function handleToggle(value: boolean): void {
        setCheck(!value);
    }
    return (
        <AdminLayout>
            <Head title="Products" />
            <h1 className="text-white text-2xl font-semibold">Products</h1>
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
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="text-white px-4 py-2 text-md border-2 border-white hover:bg-orange"
                >
                    Create
                </button>
            </div>
            <Modal
                title="Create Product"
                show={showModal}
                setShow={setShowModal}
            >
                <form className="space-y-3">
                    <div className="space-y-2">
                        <label className="text-md text-white">Name</label>
                        <input
                            type="text"
                            className="px-4 py-2 w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Category</label>
                        <input
                            type="text"
                            className="px-4 py-2 w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Price</label>
                        <input
                            type="text"
                            className="px-4 py-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <Toggle
                            active={byQuantity}
                            click={() => setByQuantity(!byQuantity)}
                            text="By Quantity?"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Quantiy</label>
                        <input
                            type="text"
                            className={`px-4 py-2 w-full rounded ${
                                !byQuantity ? "bg-gray opacity-95" : "bg-white"
                            }`}
                            disabled={!byQuantity}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Image</label>
                        <input
                            type="file"
                            className="w-full rounded bg-white file:px-4 file:py-2 file:mr-2 file:bg-black file:text-white file:border-2 file:border-white hover:file:bg-orange"
                        />
                    </div>
                    <div>
                        <img
                            src={LOGO}
                            className="object-contain h-[75px] w-[75px] rounded-full"
                        />
                    </div>
                    <div className="pt-3">
                        <button className="px-4 py-2 w-full border-2 border-white text-white text-md hover:bg-orange">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}

export default Products;
