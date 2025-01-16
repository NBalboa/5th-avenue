import React from "react";

const FoodCards = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
            {children}
        </div>
    );
};

export default FoodCards;
