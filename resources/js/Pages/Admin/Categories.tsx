import CategoryModal from "@/components/CategoryModal";
import CategoryTargetModal from "@/components/CategoryTargetModal";
import PaginatedLinks from "@/components/PaginatedLinks";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import AdminLayout from "@/Layouts/AdminLayout";
import { PaginatedData, Category } from "@/Types/types";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Categories({
    categories,
    search,
}: {
    categories: PaginatedData<Category>;
    search: string;
}) {
    const { data, setData, get, processing } = useForm({
        search: search ?? "",
    });
    const [edit, setEdit] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>(categories.data[0]);

    function handleSearch(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        get("/categories", {
            preserveScroll: true,
            replace: true,
        });
    }

    function handleEdit(category: Category) {
        setCategory(category);
        setEdit(true);
    }

    useEffect(() => {
        return () => toast.remove();
    }, []);

    return (
        <AdminLayout>
            <Toaster />
            <Head title="Category" />
            <h1 className="text-white text-2xl">Categories</h1>
            <div>
                <div>
                    <form
                        onSubmit={handleSearch}
                        className="text-white relative max-w-md ms-auto my-2 border-4 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            className="w-full ps-4 py-1 text-black text-sm pe-14 rounded-full"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 bottom-0 text-sm bg-orange px-3 hover:opacity-90 rounded-r-full"
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
                </TableHead>
                <TableBody>
                    {categories.data?.map((category) => (
                        <TableBodyRow key={category.id}>
                            <TableBodyRowData
                                isLink={true}
                                to="#"
                                click={() => handleEdit(category)}
                            >
                                {category.name}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
            {categories.total > categories.per_page ? (
                <div className="w-full text-center mt-5 flex justify-center">
                    {categories.links.map((link, index) => (
                        <PaginatedLinks key={index} link={link} />
                    ))}
                </div>
            ) : null}

            <div className="w-full text-right mt-5 pe-1">
                <CategoryModal />
            </div>
            <div>
                {category ? (
                    <CategoryTargetModal
                        show={edit}
                        setShow={setEdit}
                        category={category}
                    />
                ) : null}
            </div>
        </AdminLayout>
    );
}

export default Categories;
