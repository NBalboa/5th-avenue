const priceFormatter = (price: number) => {
    const priceFormatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return priceFormatter.format(price);
};

export default priceFormatter;
