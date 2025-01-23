import Table from "@/components/Table";
import TableBody from "@/components/TableBody";
import TableBodyRow from "@/components/TableBodyRow";
import TableBodyRowData from "@/components/TableBodyRowData";
import TableHead from "@/components/TableHead";
import TableHeadData from "@/components/TableHeadData";
import getBookingColorStatus from "@/helpers/getBookingColorStatus";
import getBookingStringStatus from "@/helpers/getBookingStringStatus";
import UserLayout from "@/Layouts/UserLayout";
import { Booking, BookingStatus } from "@/Types/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

type MyBookingsProps = {
    bookings: Booking[];
    filters: FilterSearch;
};

type FilterSearch = {
    search: string;
    booking: string;
    dateTimeLocalValue: string;
};

const MyBookings = ({ bookings, filters }: MyBookingsProps) => {
    const [dateTime, setDateTime] = useState<string>(
        filters.dateTimeLocalValue ?? ""
    );
    const [booking, setBooking] = useState<string>(filters.booking ?? "");
    const [search, setSearch] = useState<string>(filters.search ?? "");

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

        router.get("/my/booking", data, {
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <UserLayout>
            <Head title="Booking" />

            <div>
                <div>
                    <div className="text-white relative max-w-xl  mx-auto border-2 border-orange rounded-full">
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
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-2 max-w-md mx-auto">
                        <select
                            value={booking}
                            onChange={(e) => setBooking(e.target.value)}
                            className="px-4 w-full py-2 text-sm rounded-lg border-2 border-orange"
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
                            className="px-4 w-full py-2 text-sm rounded-lg border-2 border-orange"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full text-right mt-5">
                <Link
                    href="/create/booking"
                    className="px-4 py-2 text-white border-2 border-white hover:bg-orange w-full"
                >
                    Create Booking
                </Link>
            </div>
            <Table>
                <TableHead>
                    <TableHeadData>Booking ID</TableHeadData>
                    <TableHeadData>Order ID</TableHeadData>
                    <TableHeadData>Table No.</TableHeadData>
                    <TableHeadData>Booking Date</TableHeadData>
                    <TableHeadData>Closing Date</TableHeadData>
                    <TableHeadData>Booking Status</TableHeadData>
                    <TableHeadData>Gcash Reference ID</TableHeadData>
                    <TableHeadData>Orders</TableHeadData>
                </TableHead>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableBodyRow key={booking.id}>
                            <TableBodyRowData>{booking.id}</TableBodyRowData>
                            <TableBodyRowData>
                                {booking.order_id}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.table.no}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.date} {booking.time}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.booking_status ===
                                BookingStatus.CONFIRM
                                    ? booking.closing_date
                                    : null}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                <p
                                    className={`${getBookingColorStatus(
                                        booking.booking_status
                                    )} text-center`}
                                >
                                    {getBookingStringStatus(
                                        booking.booking_status
                                    )}
                                </p>
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.gcash_reference_id}
                            </TableBodyRowData>
                            <TableBodyRowData>
                                {booking.order_id ? (
                                    <Link
                                        href={`/my/orders/items/${booking.order_id}`}
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
        </UserLayout>
    );
};

export default MyBookings;
