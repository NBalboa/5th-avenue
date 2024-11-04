import CategoryModal from "@/components/CategoryModal";
import CategoryTargetModal from "@/components/CategoryTargetModal";
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

function Categories({
    categories,
    search,
}: {
    categories: PaginatedData<Category>;
    search: string;
}) {
    const { data, setData, get } = useForm({
        search: search ?? "",
    });
    const [edit, setEdit] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>(categories.data[0]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            get("/categories", {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearInterval(timeout);
    }, [data]);

    function handleSearch(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        get("/suppliers", {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }

    function handleEdit(category: Category) {
        setCategory(category);
        setEdit(true);
    }

    return (
        <AdminLayout>
            <Head title="Admin" />
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
                            className="w-full ps-4 py-2 text-black pe-14 rounded-full"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 bottom-0 text-2xl bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
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
