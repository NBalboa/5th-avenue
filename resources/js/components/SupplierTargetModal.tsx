import { Supplier } from "@/Types/types";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useAddress from "@/Hooks/useAddress";
import Error from "./Error";
import Spinner from "./Spinner";
import { router, usePage } from "@inertiajs/react";
import toast, { Toast, Toaster } from "react-hot-toast";

function SupplierTargetModal({
    supplier,
    show,
    setShow,
}: {
    supplier: Supplier;
    show: boolean;
    setShow: Function;
}) {
    const {
        provinces,
        cities,
        barangays,
        handleSetProvince,
        handleSetCity,
        handleSetBarangay,
    } = useAddress();

    const [data, setData] = useState<Supplier>(supplier);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setData(supplier);
    }, [supplier]);

    const { errors } = usePage().props;

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        setLoading(true);
        router.put(
            `/suppliers/${supplier.id}`,
            {
                street: data.address.street,
                barangay: data.address.barangay,
                city: data.address.city,
                province: data.address.province,
                phone: data.phone,
                telephone: data.telephone,
                email: data.email,
                name: data.name,
            },
            {
                preserveState: true,
                onSuccess: () => {
                    setLoading(false);
                    toast.success("Supplier updated successfully", {
                        position: "top-right",
                    });
                },
                onError: () => {
                    setLoading(false);
                    toast.error("Something went wrong", {
                        position: "top-right",
                    });
                },
            }
        );
    }

    function deleteSupplier(t: Toast) {
        router.delete(`/suppliers/${supplier.id}`, {
            replace: true,
            onSuccess: () => {
                toast.dismiss(t.id);
                setShow(false);
                toast.success("Supplier deleted successfully", {
                    position: "top-right",
                });
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
                            onClick={() => deleteSupplier(t)}
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

    function handleProvince(value: string | null) {
        if (value) {
            const province = handleSetProvince(value);
            if (province) {
                setData((prevData) => ({
                    ...prevData,
                    address: {
                        ...prevData.address,
                        province: province.name,
                    },
                }));
            }
        }
    }

    function handleCity(value: string | null) {
        if (value) {
            const city = handleSetCity(value);
            if (city) {
                setData((prevData) => ({
                    ...prevData,
                    address: {
                        ...prevData.address,
                        city: city.name,
                    },
                }));
            }
        }
    }

    function handleBarangay(value: string | null) {
        if (value) {
            const barangay = handleSetBarangay(value);
            if (barangay) {
                setData((prevData) => ({
                    ...prevData,
                    address: {
                        ...prevData.address,
                        barangay: barangay.name,
                    },
                }));
            }
        }
    }

    return (
        <div>
            <Toaster />

            <Modal
                title="Edit Supplier"
                showModal={show}
                setShowModal={setShow}
                center={true}
            >
                <form className="space-y-3" onSubmit={handleSubmit}>
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
                        <label className="text-md text-white">Name</label>
                        <input
                            type="text"
                            value={data?.name}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    name: e.target.value,
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors?.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div>
                        <h3 className="text-xl text-white">Contact</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Phone</label>
                        <input
                            type="text"
                            value={data.phone ?? ""}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    phone: e.target.value.replace(
                                        /(?!^\+)[^0-9]/g,
                                        ""
                                    ),
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Email</label>
                        <input
                            type="email"
                            value={data.email ?? ""}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    email: e.target.value,
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Telephone</label>
                        <input
                            type="text"
                            value={data.telephone ?? ""}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    telephone: e.target.value.replace(
                                        /[^0-9-]|--+/g,
                                        ""
                                    ),
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl text-white">Address</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">
                            Street/Purok/Block No./Lot No./Building No.
                        </label>
                        <input
                            type="text"
                            value={data.address.street}
                            onChange={(e) =>
                                setData((prevData) => ({
                                    ...prevData,
                                    address: {
                                        ...prevData.address,
                                        street: e.target.value,
                                    },
                                }))
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors?.street ? <Error>{errors.street}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Province</label>
                        <select
                            className="px-4 py-3 text-md w-full rounded"
                            value={data.address.province}
                            onChange={(e) =>
                                handleProvince(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                        >
                            <option value="">{data.address.province}</option>
                            {provinces.map((province) => (
                                <option
                                    data-id={province.psgcCode}
                                    value={province.name}
                                    key={province.psgcCode}
                                >
                                    {province.name}
                                </option>
                            ))}
                        </select>
                        {errors?.province ? (
                            <Error>{errors.province}</Error>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">
                            City/Municipality
                        </label>
                        <select
                            value={data.address.city}
                            onChange={(e) =>
                                handleCity(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                            className="px-4 py-3 text-md w-full rounded"
                        >
                            <option>{data.address.city}</option>
                            {cities?.map((city) => (
                                <option
                                    key={city.psgcCode}
                                    value={city.name}
                                    data-id={city.psgcCode}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors?.city ? <Error>{errors.city}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Barangay</label>
                        <select
                            className="px-4 py-3 text-md w-full rounded"
                            value={data.address.barangay}
                            onChange={(e) =>
                                handleBarangay(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                        >
                            <option value="">{data.address.barangay}</option>
                            {barangays?.map((barangay) => (
                                <option
                                    key={barangay.psgcCode}
                                    value={barangay.name}
                                    data-id={barangay.psgcCode}
                                >
                                    {barangay.name}
                                </option>
                            ))}
                        </select>
                        {errors?.barangay ? (
                            <Error>{errors.barangay}</Error>
                        ) : null}
                    </div>
                    <div className="pt-2">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <button
                                type="submit"
                                className="border-2 border-white px-4 py-2 text-white text-md w-full hover:bg-orange"
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

export default SupplierTargetModal;
