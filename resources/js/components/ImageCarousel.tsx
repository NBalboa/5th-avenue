const ImageCarousel = ({
    src,
    currentId,
    id,
}: {
    src: string;
    currentId: number;
    id: number;
}) => {
    return (
        <img
            src={src}
            className={`w-full h-[600px] w-[600px] ${
                currentId === id ? "block" : "hidden"
            }  rounded-lg`}
        />
    );
};

export default ImageCarousel;
