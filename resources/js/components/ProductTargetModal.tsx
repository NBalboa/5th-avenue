import { Category, Product, UserRole } from "@/Types/types";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { router, usePage } from "@inertiajs/react";
import Error from "./Error";
import Spinner from "./Spinner";
import toast, { Toast } from "react-hot-toast";

function ProductTargetModal({
    product,
    show,
    setShow,
    categories,
}: {
    product: Product;
    show: boolean;
    setShow: Function;
    categories: Category[];
}) {
    const [data, setData] = useState<Product>(product);
    const [loading, setLoading] = useState<boolean>(false);

    const { errors, auth } = usePage().props;

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        setLoading(true);
        router.post(
            `/products/${product.id}`,
            {
                name: data.name,
                category: data.category_id,
                price: data.price,
                image: image,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success("Product updated succesfully", {
                        position: "top-right",
                    });
                    setLoading(false);
                },
                onError: () => {
                    toast.success("Something went wrong", {
                        position: "top-right",
                    });
                    setLoading(false);
                },
            }
        );
    }

    function deleteProduct(t: Toast) {
        router.delete(`/products/${product.id}`, {
            preserveState: true,
            replace: true,
            onSuccess: () => {
                toast.dismiss(t.id);
                setShow(false);
                toast.success("Supplier deleted successfully", {
                    position: "top-right",
                });
                toast.remove();
            },
        });
    }

    function handleAlertDelete() {
        toast(
            (t) => (
                <div>
                    <span className="mb-2">Are you sure to delete this?</span>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => deleteProduct(t)}
                            className="px-4 py-2 bg-red-600 text-white hover:bg-opacity-80 rounded"
                        >
                            Yes
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-opacity-80 rounded"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
            }
        );
    }

    const [preview, setPreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (!product) {
            setShow(false);
        } else {
            setData(product);
        }
    }, [product]);

    return (
        <div>
            <Modal
                title="Edit Category"
                center={true}
                setShowModal={() => setShow(false)}
                showModal={show}
            >
                <form className="space-y-3" onSubmit={handleSubmit}>
                    {auth.role === UserRole.ADMIN ? (
                        <div className="w-full text-right">
                            <button
                                onClick={() => handleAlertDelete()}
                                type="button"
                                className="bg-red-600 px-4 py-2 border-2 border-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    ) : null}

                    <div className="space-y-2">
                        <label className="text-md text-white">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="px-4 py-2 w-full rounded"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Category</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    category_id: Number(e.target.value),
                                }))
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
                            value={data?.price}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...(prev as Product),
                                    price: Number(e.target.value),
                                }))
                            }
                            className="px-4 py-2 w-full rounded"
                        />
                        {errors.price ? <Error>{errors.price}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setImage(file);
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
                        ) : (
                            <img
                                src={product.image}
                                className="object-contain h-[75px] w-[75px] rounded-full"
                            />
                        )}
                    </div>

                    <div className="pt-3">
                        {loading ? (
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

export default ProductTargetModal;
