import React, { useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "./Spinner";
import Error from "./Error";

function CategoryModal() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const [show, setShow] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();

        post("/categories", {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Category created successfully", {
                    position: "top-right",
                });
                reset();
            },
        });
    }

    return (
        <div>
            <Toaster />
            <button
                onClick={() => setShow(true)}
                className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
            >
                Create Category
            </button>
            <Modal
                center={true}
                title="Create Category"
                showModal={show}
                setShowModal={setShow}
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-md text-white text-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div>
                        {processing ? (
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

export default CategoryModal;
