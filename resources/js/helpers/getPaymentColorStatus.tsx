import { PaymentStatus } from "@/Types/types";

const getPaymentColorStatus = (status: PaymentStatus): string => {
    if (PaymentStatus.PENDING === status) {
        return "rounded border-2 border-yellow-400 bg-yellow-500 text-white";
    } else {
        return "rounded border-2 border-green-400 bg-green-500 text-white";
    }
};

export default getPaymentColorStatus;
