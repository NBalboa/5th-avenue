import { useEffect, useState } from "react";
import Modal from "./Modal";

type ViewImageModalProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    image: string | null;
};

const ViewImageModal = ({ show, setShow, image }: ViewImageModalProps) => {
    const [data, setData] = useState<string | null>(image);

    useEffect(() => {
        setData(image);
    }, [image]);
    return (
        <div>
            <Modal
                center={true}
                title="Image"
                showModal={show}
                setShowModal={() => setShow(false)}
            >
                {data ? (
                    <img src={data} className="h-80 max-w-md mx-auto" />
                ) : null}
            </Modal>
        </div>
    );
};

export default ViewImageModal;
