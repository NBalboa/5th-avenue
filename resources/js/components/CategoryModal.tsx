import React, { useState } from "react";
import Modal from "./Modal";

function CategoryModal() {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div>
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
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-md text-white text-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            className="px-4 py-2 text-md w-full rounded"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full border-2 border-white text-white text-md px-4 py-2 hover:bg-orange"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default CategoryModal;
