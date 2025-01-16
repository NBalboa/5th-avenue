import RegisterModalStaff from "@/components/RegisterModalStaff";
import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getUserRoleString from "@/helpers/getUserRoleString";
import AdminLayout from "@/Layouts/AdminLayout";
import { User } from "@/Types/types";
type UserProps = {
    users: User[];
};
const Users = ({ users }: UserProps) => {
    return (
        <AdminLayout>
            <h1 className="text-white text-2xl font-semibold my-2">Users</h1>
            <div className="w-full text-right">
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
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </AdminLayout>
    );
};

export default Users;
