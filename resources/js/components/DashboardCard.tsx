import React from "react";

const DashboardCard = ({
    total,
    label,
    icon,
}: {
    total: number;
    label: string;
    icon: JSX.Element;
}) => {
    return (
        <div className="bg-orange p-5 rounded grid grid-cols-1 gap-5">
            <div className="text-5xl text-white transition hover:scale-125 place-self-end">
                {icon}
            </div>
            <div>
                <p className="text-white text-3xl">{total}</p>
                <h3 className="text-white text-xl font-semibold break-all">
                    {label}
                </h3>
            </div>
        </div>
    );
};

export default DashboardCard;
