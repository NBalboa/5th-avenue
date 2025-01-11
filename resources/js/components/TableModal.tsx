import React, { useState } from "react";
import Modal from "./Modal";
import ButtonModal from "./ButtonModal";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
import Label from "./Label";
import Input from "./Input";
import FormButton from "./FormButton";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import Error from "./Error";
import Spinner from "./Spinner";
import InputNumber from "./InputNumber";

function TableModal() {
    const [show, setShow] = useState<boolean>(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        no: "",
        name: "",
        description: "",
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!processing) {
            post("/tables", {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Table created successfully");
                    reset();
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            });
        }
    }

    return (
        <div>
            <ButtonModal
                label="Create Table"
                onHandleClick={() => setShow(true)}
            />
            <Modal
                title="Create Table"
                center={true}
                showModal={show}
                setShowModal={() => setShow(false)}
            >
                <Form onHandleSubmit={handleSubmit}>
                    <InputWrapper>
                        <Label label="No." />
                        <InputNumber
                            value={data.no}
                            onHandleChange={(e) =>
                                setData("no", e.target.value)
                            }
                        />
                        {errors.no ? <Error>{errors.no}</Error> : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Name" />
                        <Input
                            value={data.name}
                            onHandleChange={(e) =>
                                setData("name", e.target.value)
                            }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Description" />
                        <Input
                            value={data.description}
                            onHandleChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </InputWrapper>
                    {processing ? <Spinner /> : <FormButton label="Save" />}
                </Form>
            </Modal>
        </div>
    );
}

export default TableModal;
