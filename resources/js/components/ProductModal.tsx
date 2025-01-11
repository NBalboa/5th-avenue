import { useRef, useState } from "react";
import Modal from "./Modal";
import Toggle from "./Toggle";
import { useForm } from "@inertiajs/react";
import { Category, Supplier } from "@/Types/types";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import Error from "./Error";

function ProductModal({
    categories,
    suppliers,
}: {
    categories: Category[];
    suppliers: Supplier[];
}) {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        category: "",
        price: "",
        by_quantity: false,
        quantity: "",
        supplier: "",
        image: null as File | null | string,
    });

    const imageRef = useRef<HTMLInputElement | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        if (!data.by_quantity) {
            reset("quantity", "supplier");
        }

        post("/products", {
            preserveState: true,
            onSuccess: () => {
                toast.success("Product created successfully", {
                    position: "top-right",
                });
                setPreview(null);
                if (imageRef?.current && imageRef?.current.value) {
                    imageRef.current.value = "";
                }
                reset();
            },
            onError: () => {
                console.log(errors);
                toast.error("Something went wrong", {
                    position: "top-right",
                });
            },
        });
    }

    return (
        <div>
            <button
                onClick={() => setShow(true)}
                className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
            >
                Create Product
            </button>
            <Modal
                center={true}
                title="Create Product"
                showModal={show}
                setShowModal={() => setShow(false)}
            >
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-md text-white">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="px-4 py-2 w-full rounded"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Category</label>
                        <select
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            className="px-4 py-3 w-full rounded"
                        >
                            <option>Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category ? (
                            <Error>{errors.category}</Error>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Price</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="px-4 py-2 w-full rounded"
                        />
                        {errors.price ? <Error>{errors.price}</Error> : null}
                    </div>
                    <div>
                        <Toggle
                            active={data.by_quantity}
                            click={() =>
                                setData("by_quantity", !data.by_quantity)
                            }
                            text="By Quantity?"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Quantiy</label>
                        <input
                            type="number"
                            value={!data.by_quantity ? "" : data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            className={`px-4 py-2 w-full rounded ${
                                !data.by_quantity
                                    ? "bg-gray opacity-95"
                                    : "bg-white"
                            }`}
                            disabled={!data.by_quantity}
                        />
                        {errors.quantity ? (
                            <Error>{errors.quantity}</Error>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Supplier</label>
                        <select
                            value={!data.by_quantity ? "" : data.supplier}
                            onChange={(e) =>
                                setData("supplier", e.target.value)
                            }
                            className={`px-4 py-3 text-md w-full rounded ${
                                !data.by_quantity
                                    ? "bg-gray opacity-95"
                                    : "bg-white"
                            }`}
                            disabled={!data.by_quantity}
                        >
                            <option value="">Choose Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                        {errors.supplier ? (
                            <Error>{errors.supplier}</Error>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Image</label>
                        <input
                            type="file"
                            ref={imageRef}
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setData("image", file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            className="w-full rounded bg-white file:px-4 file:py-2 file:mr-2 file:bg-black file:text-white file:border-2 file:border-white hover:file:bg-orange"
                        />
                        {errors.image ? <Error>{errors.image}</Error> : null}
                    </div>
                    <div>
                        {preview ? (
                            <img
                                src={preview}
                                className="object-contain h-[75px] w-[75px] rounded-full"
                            />
                        ) : null}
                    </div>
                    <div className="pt-3">
                        {processing ? (
                            <Spinner />
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 w-full border-2 border-white text-white text-md hover:bg-orange"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ProductModal;
