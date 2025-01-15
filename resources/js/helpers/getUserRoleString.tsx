import { UserRole } from "@/Types/types";

const getUserRoleString = (role: UserRole): string => {
    if (UserRole.ADMIN === role) {
        return "Admin";
    } else if (UserRole.MANAGER === role) {
        return "Manager";
    } else if (UserRole.CASHIER === role) {
        return "Cashier";
    } else {
        return "Customer";
    }
};

export default getUserRoleString;
