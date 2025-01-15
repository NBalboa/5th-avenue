import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import { PaginatedData, Stock } from "@/Types/types";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
type StocksHistoryProps = {
    stocks: PaginatedData<Stock>;
    filters: StocksHistoryFilter;
};

type StocksHistoryFilter = {
    search: string;
};
const StocksHistory = ({ stocks, filters }: StocksHistoryProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get(
            "/stocks/history",
            { search: search },
            {
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <AdminLayout>
            <div>
                <div>
                    <form
                        onSubmit={handleSearch}
                        className="text-white relative w-full md:w-[500px] mx-auto my-2 border-4 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full ps-4 py-1 text-black pe-14 rounded-full text-sm"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Image</TableHeadData>
                    <TableHeadData>Product Name</TableHeadData>
                    <TableHeadData>Supplier Name</TableHeadData>
                    <TableHeadData>Quantity</TableHeadData>
                    <TableHeadData>Description</TableHeadData>
                </TableHead>
                <TableBody>
                    {stocks.data.map((stock) => (
                        <TableBodyRow key={stock.id}>
                            <TableBodyRowData>
                                <img
                                    src={stock.product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {stock.product.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {stock.supplier?.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {stock.quantity}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {stock.description}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>

            {stocks.total > stocks.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {stocks.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}
        </AdminLayout>
    );
};

export default StocksHistory;
