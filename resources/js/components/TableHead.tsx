import { ReactNode } from "react";

function TableHead({ children }: { children: ReactNode }) {
    return (
        <thead className="bg-gray bg-opacity-20 text-orange">
            <tr>{children}</tr>
        </thead>
    );
}

export default TableHead;
