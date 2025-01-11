import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAddress from "@/Hooks/useAddress";
import { useForm } from "@inertiajs/react";
import Spinner from "./Spinner";
import Error from "./Error";
import toast, { Toaster } from "react-hot-toast";
function SupplierModal() {
    const [show, setShow] = useState<boolean>(false);
    const {
        provinces,
        cities,
        barangays,
        handleSetProvince,
        handleSetCity,
        handleSetBarangay,
    } = useAddress();

    const { data, setData, post, processing, errors, reset } = useForm({
        street: "",
        barangay: "",
        city: "",
        province: "",
        phone: "",
        telephone: "",
        email: "",
        name: "",
    });
    function handleProvince(value: string | null) {
        if (value) {
            const province = handleSetProvince(value);
            if (province) {
                setData("province", province.name);
            }
        }
    }

    function handleCity(value: string | null) {
        if (value) {
            const city = handleSetCity(value);
            if (city) {
                setData("city", city.name);
            }
        }
    }

    function handleBarangay(value: string | null) {
        if (value) {
            const barangay = handleSetBarangay(value);
            if (barangay) {
                setData("barangay", barangay.name);
            }
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        post("/suppliers", {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                toast.success("Supplier created successfully", {
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
                Create Supplier
            </button>
            <Modal
                title="Create Supplier"
                center={true}
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
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors.name ? <Error>{errors.name}</Error> : null}
                    </div>
                    <div>
                        <h3 className="text-xl text-white">Contact</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Phone</label>
                        <input
                            type="r"
                            value={data.phone}
                            onChange={(e) =>
                                setData(
                                    "phone",
                                    e.target.value.replace(/(?!^\+)[^0-9]/g, "")
                                )
                            }
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Telephone</label>
                        <input
                            type="text"
                            value={data.telephone}
                            onChange={(e) =>
                                setData(
                                    "telephone",
                                    e.target.value.replace(/[^0-9-]|--+/g, "")
                                )
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
                            value={data.street}
                            onChange={(e) => setData("street", e.target.value)}
                            className="px-4 py-2 text-md w-full rounded"
                        />
                        {errors.street ? <Error>{errors.street}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Province</label>
                        <select
                            className="px-4 py-3 text-md w-full rounded"
                            value={data.province}
                            onChange={(e) =>
                                handleProvince(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                        >
                            <option value="">Choose Province</option>
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
                        {errors.province ? (
                            <Error>{errors.province}</Error>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">
                            City/Municipality
                        </label>
                        <select
                            value={data.city}
                            onChange={(e) =>
                                handleCity(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                            className="px-4 py-3 text-md w-full rounded"
                        >
                            <option>Choose City/Municipality</option>
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
                        {errors.city ? <Error>{errors.city}</Error> : null}
                    </div>
                    <div className="space-y-2">
                        <label className="text-md text-white">Barangay</label>
                        <select
                            className="px-4 py-3 text-md w-full rounded"
                            value={data.barangay}
                            onChange={(e) =>
                                handleBarangay(
                                    e.target.selectedOptions[0].getAttribute(
                                        "data-id"
                                    )
                                )
                            }
                        >
                            <option>Choose Province</option>
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
                        {errors.barangay ? (
                            <Error>{errors.barangay}</Error>
                        ) : null}
                    </div>
                    <div className="pt-2">
                        {processing ? (
                            <Spinner />
                        ) : (
                            <button className="border-2 border-white px-4 py-2 text-white text-md w-full hover:bg-orange">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default SupplierModal;
