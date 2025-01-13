import { BookingStatus } from "@/Types/types";

const getBookingStringStatus = (status: BookingStatus) => {
    if (status === BookingStatus.PENDING) {
        return "Pending";
    } else {
        return "Confirm";
    }
};

export default getBookingStringStatus;
