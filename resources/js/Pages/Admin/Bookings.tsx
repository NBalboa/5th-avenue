import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getBookingColorStatus from "@/helpers/getBookingColorStatus";
import getBookingStringStatus from "@/helpers/getBookingStringStatus";
import getOrderStatusString from "@/helpers/getOrderStatusString";
import AdminLayout from "@/Layouts/AdminLayout";
import { Booking, BookingStatus, OrderStatus } from "@/Types/types";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

type BookingsProps = {
    bookings: Booking[];
    filters: FilterSearch;
};

type FilterSearch = {
    search: string;
    booking: string;
    dateTimeLocalValue: string;
};

const Bookings = ({ bookings, filters }: BookingsProps) => {
    const [dateTime, setDateTime] = useState<string>(
        filters.dateTimeLocalValue ?? ""
    );
    const [booking, setBooking] = useState<string>(filters.booking ?? "");
    const [search, setSearch] = useState<string>(filters.search ?? "");

    const handleChangeStatus = (
        e: React.ChangeEvent<HTMLSelectElement>,
        booking: Booking
    ) => {
        const data = {
            status: e.target.value,
        };
        router.post(`/bookings/${booking.id}`, data, {
            preserveScroll: true,
        });
    };

    const handleSearch = () => {
        console.log(dateTime);
        const data = {
            date:
                dateTime && dateTime !== "T"
                    ? new Date(dateTime).toISOString().split("T")[0]
                    : "",
            time:
                dateTime && dateTime !== "T"
                    ? new Date(dateTime).toTimeString().split(" ")[0]
                    : "",
            search: search,
            booking: booking,
        };

        router.get("/bookings", data, {
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AdminLayout>
            <h1 className="text-white text-2xl">Bookings</h1>
            <div>
                <div className="flex flex-col my-5 gap-5">
                    <div className="text-white relative w-full  mx-auto border-2 border-orange rounded-full">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="text-sm w-full ps-4 py-1 text-black pe-14 rounded-full"
                        />
                        <button
                            onClick={() => handleSearch()}
                            className="absolute top-0 right-0 bottom-0 text-md bg-orange px-3 hover:opacity-90 rounded-r-full"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <select
                            value={booking}
                            onChange={(e) => setBooking(e.target.value)}
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        >
                            <option value="">Booking Status</option>
                            <option value={BookingStatus.PENDING}>
                                {getBookingStringStatus(BookingStatus.PENDING)}
                            </option>
                            <option value={BookingStatus.CONFIRM}>
                                {getBookingStringStatus(BookingStatus.CONFIRM)}
                            </option>
                        </select>
                        <input
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            type="datetime-local"
                            className="px-4 py-2 text-sm rounded-lg border-2 border-orange"
                        />
                    </div>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Booking ID</TableHeadData>
                    <TableHeadData>Order ID</TableHeadData>
                    <TableHeadData>Customer Name</TableHeadData>
                    <TableHeadData>No. of People</TableHeadData>
                    <TableHeadData>Booking Status</TableHeadData>
                    <TableHeadData>Date and Time</TableHeadData>
                    <TableHeadData>Proof of Partial Payment</TableHeadData>
                    <TableHeadData>GCash Reference ID</TableHeadData>
                    <TableHeadData>Oders</TableHeadData>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableBodyRow key={booking.id}>
                            <TableBodyRowData>{booking.id}</TableBodyRowData>
                            <TableBodyRowData>
                                {booking.order_id}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.user.first_name}{" "}
                                {booking.user.last_name}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.no_people}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <select
                                    onChange={(e) =>
                                        handleChangeStatus(e, booking)
                                    }
                                    value={booking.booking_status}
                                    className={`${getBookingColorStatus(
                                        booking.booking_status
                                    )}`}
                                >
                                    <option value={BookingStatus.PENDING}>
                                        {getBookingStringStatus(
                                            BookingStatus.PENDING
                                        )}
                                    </option>
                                    <option
                                        value={BookingStatus.CONFIRM}
                                        className="bg-green-500"
                                    >
                                        {getBookingStringStatus(
                                            BookingStatus.CONFIRM
                                        )}
                                    </option>
                                </select>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.date} {""} {booking.time}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.image ? (
                                    <img
                                        src={booking.image}
                                        className="object-fit w-[200px] h-[200px]  mx-auto"
                                    />
                                ) : null}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.gcash_reference_id}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.order_id ? (
                                    <Link
                                        href={`/orders/items/${booking.order_id}`}
                                        className="px-4 py-2 text-white border-2 border-white hover:bg-orange w-full"
                                    >
                                        View
                                    </Link>
                                ) : null}
                            </TableBodyRowData>
                        </TableBodyRow>
                    ))}
                </TableBody>
            </Table>
        </AdminLayout>
    );
};

export default Bookings;
