import AddQuantityModal from "@/components/AddQuantityModal";
import DeleteQuantityModal from "@/components/DeleteQuantityModal";
import PaginatedLinks from "@/components/PaginatedLinks";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ByQuantityType,
    Category,
    PaginatedData,
    Product,
    Supplier,
} from "@/Types/types";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";

type StocksProps = {
    products: PaginatedData<Product>;
    categories: Category[];
    filters: StockSearch;
    suppliers: Supplier[];
};

type StockSearch = {
    search: string;
    by_quantity_type: string;
    category: string;
};

const Stocks = ({ products, categories, filters, suppliers }: StocksProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [category, setCategory] = useState<string>(filters.category ?? "");
    const [byQuantityType, setByQuantityType] = useState<string>(
        filters.by_quantity_type ?? ""
    );

    const handleSearch = () => {
        const data = {
            search: search,
            by_quantity_type: byQuantityType,
            category: category,
        };

        router.get("/stocks", data, {
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AdminLayout>
            <h1 className="text-white text-2xl font-semibold my-2">Products</h1>

            <div>
                <div className="flex md:flex-row flex-col my-5 gap-5 items-center">
                    <div className="text-white relative w-full  mx-auto border-2 border-orange rounded-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-sm w-full ps-4 py-1 text-black pe-14 rounded-full"
                        />
                        <button
                            type="button"
                            onClick={() => handleSearch()}
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Category</option>
                            {categories.map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            value={byQuantityType}
                            onChange={(e) => setByQuantityType(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value={ByQuantityType.HIGHEST_TO_LOWEST}>
                                HIGHEST TO LOWEST
                            </option>
                            <option value={ByQuantityType.LOWEST_TO_HIGHEST}>
                                LOWEST TO HIGHEST
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-2 justify-end">
                <Link
                    href="/stocks/history"
                    className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
                >
                    History
                </Link>
                <AddQuantityModal
                    products={products.data}
                    suppliers={suppliers}
                />
                <DeleteQuantityModal
                    products={products.data}
                    suppliers={suppliers}
                />
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Image</TableHeadData>
                    <TableHeadData>Product Name</TableHeadData>
                    <TableHeadData>Category</TableHeadData>
                    <TableHeadData>Quantity</TableHeadData>
                </TableHead>
                <TableBody>
                    {products.data.map((product) => (
                        <TableBodyRow key={product.id}>
                            <TableBodyRowData>
                                <img
                                    src={product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>

                            <TableBodyRowData>{product.name}</TableBodyRowData>
                            <TableBodyRowData>
                                {product.category.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {product.quantity}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>

            {products.total > products.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {products.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}
        </AdminLayout>
    );
};

export default Stocks;
