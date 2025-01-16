const DashboardCards = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {children}
        </div>
    );
};

export default DashboardCards;
