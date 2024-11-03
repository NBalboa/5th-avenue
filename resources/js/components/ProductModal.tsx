import { useState } from "react";
import Modal from "./Modal";
import Toggle from "./Toggle";
import { useForm } from "@inertiajs/react";

function ProductModal() {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        category: "",
        price: "",
        by_quantity: false,
        quantity: "",
        supplier: "",
        image: null as File | null | string,
    });

    const [show, setShow] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        if (!data.by_quantity) {
            reset("quantity", "supplier");
        }
        console.log(data);
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
                center={false}
                title="Create Product"
                showModal={show}
                setShowModal={setShow}
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
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Price</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="px-4 py-2 w-full rounded"
                        />
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
                            <option>Choose Supplier</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Image</label>
                        <input
                            type="file"
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
                        <button className="px-4 py-2 w-full border-2 border-white text-white text-md hover:bg-orange">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ProductModal;
