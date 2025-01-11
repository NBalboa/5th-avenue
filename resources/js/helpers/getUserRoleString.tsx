import { UserRole } from "@/Types/types";

const getUserRoleString = (role: UserRole): string => {
    if (UserRole.ADMIN === role) {
        return "ADMIN";
    } else if (UserRole.MANAGER === role) {
        return "MANAGER";
    } else if (UserRole.CASHIER === role) {
        return "CASHIER";
    } else {
        return "CUSTOMER";
    }
};

export default getUserRoleString;
