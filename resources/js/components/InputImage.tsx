import React from "react";

type InputImageProps = {
    imageRef: React.RefObject<HTMLInputElement>;
    onHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string;
};
function InputImage({ imageRef, onHandleChange, preview }: InputImageProps) {
    return (
        <div className="space-y-3">
            <input
                type="file"
                ref={imageRef}
                accept="image/*"
                onChange={onHandleChange}
                className="w-full rounded bg-white file:px-4 file:py-2 file:mr-2 file:bg-black file:text-white file:border-2 file:border-white hover:file:bg-orange"
            />
            <div>
                {preview ? (
                    <img
                        src={preview}
                        className="object-contain h-[75px] w-[75px] rounded-full"
                    />
                ) : null}
            </div>
        </div>
    );
}

export default InputImage;
