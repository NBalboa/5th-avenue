const Categories = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full mx-auto text-white flex flex-col md:flex-row items-center justify-center border-4 border-gray rounded text-lg font-semibold">
            {children}
        </div>
    );
};

export default Categories;
