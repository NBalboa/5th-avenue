import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import TableModal from "@/components/TableModal";
import TableTargetModal from "@/components/TableTargetModal";
import AdminLayout from "@/Layouts/AdminLayout";
import { PaginatedData, TTable } from "@/Types/types";
import { Head, router, usePage } from "@inertiajs/react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";

function Tables({ tables }: { tables: PaginatedData<TTable> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [search, setSearch] = useState<string>("");

    function handleDownload(table: TTable) {
        const canvas = canvasRef.current;
        const pngUrl = canvas?.toDataURL("image/png");

        const link = document.createElement("a");
        if (pngUrl) {
            link.href = pngUrl;
            link.download = `Table-${table.no}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function handleSearch(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const data = { search: search };
        router.get("/tables", data, {
            replace: true,
            preserveScroll: true,
        });
    }

    const [editModal, setEditModal] = useState<boolean>(false);
    const [table, setTable] = useState<TTable>(tables.data[0]);
    const { base_url } = usePage().props;

    console.log(base_url);

    tables.data.map((table) => {
        console.log(table.name);
        console.log(`${base_url}/menus/order/tables/${table.id}`);
    });
    function handleEdit(table: TTable) {
        setTable(table);
        setEditModal(true);
    }
    return (
        <AdminLayout>
            <Head title="Table" />
            <h1 className="text-white text-2xl">Tables</h1>

            <div>
                <form
                    onSubmit={handleSearch}
                    className="text-white relative w-full md:w-[500px] mx-auto my-2 border-4 border-orange rounded-full"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full ps-4 py-1 text-black text-sm pe-14 rounded-full"
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 bottom-0 text-sm bg-orange px-3 hover:opacity-90 rounded-r-full"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>No.</TableHeadData>
                    <TableHeadData>Name</TableHeadData>
                    <TableHeadData>Description</TableHeadData>
                    <TableHeadData>QR Code</TableHeadData>
                </TableHead>
                <TableBody>
                    {tables?.data.map((table) => (
                        <TableBodyRow key={table.id}>
                            <TableBodyRowData
                                click={() => handleEdit(table)}
                                isLink={true}
                            >
                                {table.no}
                            </TableBodyRowData>
                            <TableBodyRowData>{table.name}</TableBodyRowData>
                            <TableBodyRowData>
                                {table.description}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <QRCodeCanvas
                                    ref={canvasRef}
                                    onClick={() => handleDownload(table)}
                                    className="cursor-pointer mx-auto border-2 border-orange rounded-lg"
                                    marginSize={2}
                                    value={`${base_url}/menus/order/tables/${table.id}`}
                                    size={200}
                                />
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>

            {tables.total > tables.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {tables.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}

            <div className="mt-5 w-full text-right">
                <TableModal />
            </div>
            <div>
                {table ? (
                    <TableTargetModal
                        table={table}
                        setShow={setEditModal}
                        show={editModal}
                    />
                ) : null}
            </div>
        </AdminLayout>
    );
}

export default Tables;
