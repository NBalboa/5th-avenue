import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Category } from "@/Types/types";
import Error from "./Error";
import { router, usePage } from "@inertiajs/react";
import Spinner from "./Spinner";
import toast, { Toast, Toaster } from "react-hot-toast";

function CategoryTargetModal({
    show,
    setShow,
    category,
}: {
    show: boolean;
    setShow: Function;
    category: Category;
}) {
    const { errors } = usePage().props;
    const [data, setData] = useState<Category>(category);
    const [loading, setLoading] = useState<boolean>(false);

    function deleteCategory(t: Toast) {
        router.delete(`/categories/${category.id}`, {
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
                            onClick={() => deleteCategory(t)}
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

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        setLoading(true);
        router.put(
            `/categories/${category.id}`,
            {
                name: data.name,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Product updated successfully", {
                        position: "top-right",
                    });
                    setLoading(false);
                    toast.remove();
                },
                onError: () => {
                    toast.error("Somethin went wrong", {
                        position: "top-right",
                    });
                    setLoading(false);
                    toast.remove();
                },
            }
        );
    }

    useEffect(() => {
        setData(category);
    }, [category]);

    return (
        <div>
            <Modal
                title="Edit Category"
                center={true}
                setShowModal={() => setShow(false)}
                showModal={show}
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="w-full text-right">
                        <button
                            onClick={() => handleAlertDelete()}
                            type="button"
                            className="bg-red-600 px-4 py-2 border-2 border-red-600 text-white"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white text-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button
                                type="submit"
                                className="w-full border-2 border-white text-white text-md px-4 py-2 hover:bg-orange"
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

export default CategoryTargetModal;
