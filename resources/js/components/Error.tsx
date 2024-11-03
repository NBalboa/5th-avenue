import { ReactNode } from "react";

function Error({ children }: { children: ReactNode }) {
    return <span className="text-red-500">{children}</span>;
}

export default Error;
