import { PaymentStatus } from "@/Types/types";

const getPaymentStatusString = (status: PaymentStatus): string => {
    if (status === PaymentStatus.PENDING) {
        return "Pending";
    } else {
        return "Paid";
    }
};

export default getPaymentStatusString;
