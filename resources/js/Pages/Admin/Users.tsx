import RegisterModalStaff from "@/components/RegisterModalStaff";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getUserRoleString from "@/helpers/getUserRoleString";
import AdminLayout from "@/Layouts/AdminLayout";
import { User, UserRole } from "@/Types/types";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast";
type UserProps = {
    users: User[];
    filters: FilterSearch;
};

type FilterSearch = {
    search: string;
    role: string;
};
const Users = ({ users, filters }: UserProps) => {
    const [search, setSearch] = useState<string>(filters.search ?? "");
    const [role, setRole] = useState<string>(filters.role ?? "");

    const { auth } = usePage().props;

    const handleSearch = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const data = {
            search: search,
            role: role,
        };

        router.get("/staffs", data, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    function handleAlertDelete(user: User) {
        toast(
            (t) => (
                <div>
                    <span className="mb-2">Are you sure to delete this?</span>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => handleDelete(user, t)}
                            className="px-4 py-2 bg-red-600 text-white hover:bg-opacity-80 rounded"
                        >
                            Yes
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-opacity-80 rounded"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
            }
        );
    }

    const handleDelete = (user: User, t: Toast) => {
        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(t.id);
                toast.success("User account deleted successfully");
                toast.remove();
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Users" />
            <h1 className="text-white text-2xl font-semibold my-2">Users</h1>
            <div>
                <div>
                    <form
                        onSubmit={handleSearch}
                        className="text-white relative max-w-lg  mx-auto border-2 border-orange rounded-full"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-sm w-full ps-4 py-1 text-black pe-14 rounded-full"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <div className="max-w-xs mx-auto mt-2">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Choose Role</option>
                            <option value={UserRole.ADMIN}>Admin</option>
                            <option value={UserRole.MANAGER}>Manager</option>
                            <option value={UserRole.CASHIER}>Cashier</option>
                            <option value={UserRole.CUSTOMER}>Customer</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full text-right mt-2">
                <RegisterModalStaff />
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Profile</TableHeadData>
                    <TableHeadData>ID Picture</TableHeadData>
                    <TableHeadData>Name</TableHeadData>
                    <TableHeadData>Phone</TableHeadData>
                    <TableHeadData>Email</TableHeadData>
                    <TableHeadData>Role</TableHeadData>
                    {auth.role === UserRole.ADMIN ? (
                        <TableHeadData></TableHeadData>
                    ) : null}
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableBodyRow key={user.id}>
                            <TableBodyRowData>
                                {user.profile ? (
                                    <img
                                        src={user.profile}
                                        className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                    />
                                ) : null}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        className="object-contain w-[50px] h-[50px] rounded-full mx-auto"
                                    />
                                ) : null}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {user.first_name} {user.last_name}
                            </TableBodyRowData>
                            <TableBodyRowData>{user.phone} </TableBodyRowData>
                            <TableBodyRowData>{user.email} </TableBodyRowData>
                            <TableBodyRowData>
                                {getUserRoleString(user.role)}{" "}
                            </TableBodyRowData>
                            {auth.role === UserRole.ADMIN ? (
                                <TableBodyRowData>
                                    {user.role !== UserRole.ADMIN ? (
                                        <button
                                            onClick={() =>
                                                handleAlertDelete(user)
                                            }
                                            type="button"
                                            className="bg-red-600 px-4 py-2 border-2 border-red-600 text-white"
                                        >
                                            Delete
                                        </button>
                                    ) : null}
                                </TableBodyRowData>
                            ) : null}
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </AdminLayout>
    );
};

export default Users;
