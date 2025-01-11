import React, { useEffect, useState } from "react";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
import Label from "./Label";
import InputNumber from "./InputNumber";
import { TTable } from "../Types/types";
import Modal from "./Modal";
import FormButton from "./FormButton";
import Input from "./Input";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

function TableTargetModal({
    table,
    show,
    setShow,
}: {
    table: TTable;
    show: boolean;
    setShow: Function;
}) {
    const [name, setName] = useState<string>(table.name ?? "");
    const [description, setDescription] = useState<string>(
        table.description ?? ""
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const data = {
            name: name,
            description: description,
        };

        router.put(`/tables/${table.id}`, data, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Updated Successfully");
            },
            onError: (err) => {
                if (err.no) {
                    toast.error(err.no);
                } else {
                    toast.error("Something went wrong");
                }
            },
        });
    }
    useEffect(() => {
        setName(table.name ?? "");
        setDescription(table.description ?? "");
        return () => {
            console.log("cleaning");
        };
    }, [table]);

    return (
        <div>
            <Modal
                title="Edit Table"
                setShowModal={() => setShow(false)}
                showModal={show}
                center={true}
            >
                <Form onHandleSubmit={handleSubmit}>
                    <InputWrapper>
                        <Label label="Name" />
                        <Input
                            value={name}
                            onHandleChange={(e) => setName(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Description" />
                        <Input
                            value={description}
                            onHandleChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </InputWrapper>
                    <FormButton label="Save" />
                </Form>
            </Modal>
        </div>
    );
}

export default TableTargetModal;
