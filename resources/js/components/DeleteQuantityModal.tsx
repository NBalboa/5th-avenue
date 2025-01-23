import { useState } from "react";
import Modal from "./Modal";
import { Product, Supplier } from "@/Types/types";
import Label from "./Label";
import InputNumber from "./InputNumber";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
import FormButton from "./FormButton";
import { router, usePage } from "@inertiajs/react";
import Error from "./Error";

type DeleteQuantityModalProps = {
    products: Product[];
    suppliers: Supplier[];
};

function DeleteQuantityModal({
    products,
    suppliers,
}: DeleteQuantityModalProps) {
    const [show, setShow] = useState<boolean>(false);
    const [product, setProduct] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<string>("");
    const [supplier, setSupplier] = useState<string>("");
    const { errors } = usePage().props;

    const handleChangeProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct(e.target.value);
        const product = products.find(
            (product) => product.id === parseInt(e.target.value)
        );
        if (product) {
            setImage(product.image);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            quantity: quantity,
            supplier: supplier,
        };
        router.post(`/product/delete/quantity/${product}`, data, {
            preserveScroll: true,
            onSuccess: () => {
                setImage(null);
                setProduct("");
                setQuantity("");
            },
        });
    };

    return (
        <div>
            <button
                onClick={() => setShow(true)}
                className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
            >
                Delete Stocks
            </button>
            <Modal
                center={true}
                title="Delete Stocks"
                showModal={show}
                setShowModal={() => setShow(false)}
            >
                <Form onHandleSubmit={handleSubmit}>
                    <InputWrapper>
                        {image ? (
                            <img
                                src={image}
                                className="object-fit w-[200px] h-[200px] rounded-xl mx-auto"
                            />
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Choose Product" />
                        <select
                            value={product}
                            onChange={(e) => handleChangeProduct(e)}
                            className="px-4 py-2 text-md w-full rounded"
                        >
                            <option value="">Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </InputWrapper>
                    {/* <InputWrapper>
                        <Label label="Choose Supplier" />
                        <select
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            className="px-4 py-2 text-md w-full rounded"
                        >
                            <option value="">Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </InputWrapper> */}
                    <InputWrapper>
                        <Label label="Quantity" />
                        <InputNumber
                            value={quantity}
                            onHandleChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity ? (
                            <Error>{errors.quantity}</Error>
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        {product ? <FormButton label="Delete Stocks" /> : null}
                    </InputWrapper>
                </Form>
            </Modal>
        </div>
    );
}

export default DeleteQuantityModal;
