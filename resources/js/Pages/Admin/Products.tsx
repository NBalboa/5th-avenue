import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
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
import {
    Category,
    IsAvailable,
    PaginatedData,
    Product,
    Supplier,
} from "@/Types/types";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import ProductTargetModal from "@/components/ProductTargetModal";
import PaginatedLinks from "@/components/PaginatedLinks";

function Products({
    categories,
    suppliers,
    products,
    search,
    category,
}: {
    categories: Category[];
    suppliers: Supplier[];
    products: PaginatedData<Product>;
    search?: string;
    category?: number;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [id, setId] = useState<number>();

    const { data, setData, get, processing } = useForm({
        search: search ?? "",
        category: category ?? null,
    });

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);

    function handleEdit(product: Product) {
        setProduct(product);
        setShowEdit(true);
    }

    function handleSearch(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();

        get("/products", {
            preserveScroll: true,
            replace: true,
        });
    }

    function handleToggle(id: number, value: boolean): void {
        if (!loading) {
            setLoading(true);
            setId(id);
            router.put(
                `/products/available/${id}`,
                { available: value },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setLoading(false);
                        setId(-1);
                    },
                    onError: () => {
                        toast.error("Something went wrong", {
                            position: "top-right",
                        });
                        setLoading(false);
                        setId(-1);
                    },
                }
            );
        } else {
            toast.error("Wait", {
                icon: "⏳",
                position: "top-right",
                duration: 1000,
            });
        }
    }

    return (
        <AdminLayout>
            <Head title="Products" />
            <h1 className="text-white text-2xl font-semibold my-2">Products</h1>

            <div>
                <div className="flex my-5 gap-5 items-center">
                    <form
                        onSubmit={handleSearch}
                        className="text-white relative w-full  mx-auto border-2 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            className="text-sm w-full ps-4 py-1 text-black pe-14 rounded-full"
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
                    <div>
                        <select
                            value={data.category ?? ""}
                            onChange={(e) =>
                                setData("category", Number(e.target.value))
                            }
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Choose Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

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
                    {products.data?.map((product) => (
                        <TableBodyRow key={product.id}>
                            <TableBodyRowData>
                                <img
                                    src={product.image}
                                    className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                />
                            </TableBodyRowData>
                            <TableBodyRowData
                                isLink={true}
                                click={() => handleEdit(product)}
                            >
                                {product.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {product.category.name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {product.quantity ?? ""}
                            </TableBodyRowData>
                            <TableBodyRowData>{product.price}</TableBodyRowData>
                            <TableBodyRowData>
                                <div className="relative">
                                    <div className="absolute -top-[33px] -right-[5px]">
                                        {product.id === id && loading ? (
                                            <Spinner />
                                        ) : null}
                                    </div>
                                </div>
                                <Toggle
                                    text={null}
                                    active={
                                        product.is_available === IsAvailable.YES
                                            ? true
                                            : false
                                    }
                                    id={product.id}
                                    click={handleToggle}
                                />
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>

            <div className="w-full text-center mt-5 flex justify-center">
                {products.links.map((link, index) => (
                    <PaginatedLinks key={index} link={link} />
                ))}
            </div>

            <div className="w-full text-right mt-5 pe-1">
                <ProductModal suppliers={suppliers} categories={categories} />
            </div>
            <div>
                {product ? (
                    <ProductTargetModal
                        show={showEdit}
                        setShow={setShowEdit}
                        product={product}
                        categories={categories}
                    />
                ) : null}
            </div>
        </AdminLayout>
    );
}

export default Products;
