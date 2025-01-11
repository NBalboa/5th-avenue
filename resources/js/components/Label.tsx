import React from "react";

type LabelProps = {
    label: string;
};

function Label({ label }: LabelProps) {
    return <label className="text-md text-white">{label}</label>;
}

export default Label;
