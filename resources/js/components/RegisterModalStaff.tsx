import React, { useRef, useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
import FormButton from "./FormButton";
import Label from "./Label";
import Error from "./Error";
import Phone from "./Phone";
import Input from "./Input";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import InputImage from "./InputImage";
import Select from "./Select";
import { UserRole } from "@/Types/types";
import getUserRoleString from "@/helpers/getUserRoleString";
import { router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

const RegisterModalStaff = () => {
    const [show, setShow] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [profile, setProfile] = useState<File | null>(null);
    const [previewProfile, setPreviewProfile] = useState<string>("");
    const [idPicture, setIdPicture] = useState<File | null>(null);
    const [previewIdPicture, setPreviewIdPicture] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const { errors } = usePage().props;
    console.log(errors);
    const profileRef = useRef<HTMLInputElement>(null);
    const idPictureRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid) {
            const data = {
                image: idPicture,
                profile: profile,
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                phone: phone,
                email: email,
                role: role,
                password: password,
                confirm_password: confirmPassword,
            };

            router.post("/staffs", data, {
                preserveScroll: true,
                onSuccess: () => {
                    setPhone("");
                    setFirstName("");
                    setLastName("");
                    setMiddleName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setProfile(null);
                    setPreviewProfile("");
                    setIdPicture(null);
                    setPreviewIdPicture("");
                    setRole("");

                    if (idPictureRef?.current && idPictureRef?.current.value) {
                        idPictureRef.current.value = "";
                    }

                    if (profileRef?.current && profileRef.current.value) {
                        profileRef.current.value = "";
                    }
                    toast.success("Staff created successfully");
                },
            });
        }
    };

    const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setProfile(file);
            setPreviewProfile(URL.createObjectURL(file));
        }
    };

    const handleIdPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setIdPicture(file);
            setPreviewIdPicture(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <button
                onClick={() => setShow(true)}
                className="px-4 py-2 text-white border-2 border-white hover:bg-orange"
            >
                Add Staff
            </button>
            <Modal
                center={true}
                title="Register Staffs"
                showModal={show}
                setShowModal={() => setShow(false)}
            >
                <Form onHandleSubmit={handleSubmit}>
                    <InputWrapper>
                        <Label label="First Name" />

                        <Input
                            value={firstName}
                            onHandleChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.first_name ? (
                            <Error>{errors.first_name}</Error>
                        ) : null}
                    </InputWrapper>

                    <InputWrapper>
                        <Label label="Middle Name (Optional)" />
                        <Input
                            value={middleName}
                            onHandleChange={(e) =>
                                setMiddleName(e.target.value)
                            }
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Last Name" />
                        <Input
                            value={lastName}
                            onHandleChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.last_name ? (
                            <Error>{errors.last_name}</Error>
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Email" />
                        <InputEmail
                            value={email}
                            onHandleChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email ? <Error>{errors.email}</Error> : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Role" />
                        <Select
                            value={role}
                            onHandleChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Choose Role</option>
                            <option value={UserRole.CASHIER}>
                                {getUserRoleString(UserRole.CASHIER)}
                            </option>
                            <option value={UserRole.MANAGER}>
                                {getUserRoleString(UserRole.MANAGER)}
                            </option>
                            <option value={UserRole.ADMIN}>
                                {getUserRoleString(UserRole.ADMIN)}
                            </option>
                        </Select>
                        {errors.role ? <Error>{errors.role}</Error> : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Password" />
                        <InputPassword
                            value={password}
                            show={showPassword}
                            onHandleChange={(e) => setPassword(e.target.value)}
                            onHandleShow={(show) => setShowPassword(show)}
                        />
                        {errors.password ? (
                            <Error>{errors.password}</Error>
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Confirm Password" />
                        <InputPassword
                            show={showPassword}
                            onHandleShow={(show) => setShowPassword(show)}
                            value={confirmPassword}
                            onHandleChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                        {errors.confirm_password ? (
                            <Error>{errors.confirm_password}</Error>
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Phone No." />
                        <Phone
                            isValid={isValid}
                            setIsValid={(valid) => setIsValid(valid)}
                            phone={phone}
                            setPhone={(phone) => setPhone(phone)}
                        />
                        {errors.phone ? <Error>{errors.phone}</Error> : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="Profile" />
                        <InputImage
                            imageRef={profileRef}
                            preview={previewProfile}
                            onHandleChange={(e) => handleProfile(e)}
                        />

                        {errors.profile ? (
                            <Error>{errors.profile}</Error>
                        ) : null}
                    </InputWrapper>
                    <InputWrapper>
                        <Label label="ID Picture" />
                        <InputImage
                            imageRef={idPictureRef}
                            preview={previewIdPicture}
                            onHandleChange={(e) => handleIdPicture(e)}
                        />
                        {errors.image ? <Error>{errors.image}</Error> : null}
                    </InputWrapper>

                    <InputWrapper>
                        <FormButton label="Register Staff" />
                    </InputWrapper>
                </Form>
            </Modal>
        </div>
    );
};

export default RegisterModalStaff;
