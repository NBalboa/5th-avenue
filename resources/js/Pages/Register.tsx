import Error from "@/components/Error";
import InputSeparator from "@/components/InputSeparator";
import TwoInputsLayout from "@/Layouts/TwoInputsLayout";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        conf_password: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        post("/register", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Account created successfully");
            },
        });
    };

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <UserLayout>
            <Head title="Register" />
            <div className="max-w-3xl mx-auto px-14 py-12 border-2 border-white rounded-lg">
                <div className="space-y-3">
                    <h2 className="text-white text-2xl font-semibold">
                        Create an Account
                    </h2>
                    <form
                        className="w-full space-y-3 p-4 rounded-lg"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                    {errors.first_name ? (
                                        <Error>{errors.first_name}</Error>
                                    ) : null}
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Middle Name
                                    </label>
                                    <input
                                        value={data.middle_name}
                                        onChange={(e) =>
                                            setData(
                                                "middle_name",
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Last Name
                                    </label>
                                    <input
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                    {errors.last_name ? (
                                        <Error>{errors.last_name}</Error>
                                    ) : null}
                                </InputSeparator>
                            </TwoInputsLayout>
                        </div>
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Email
                                    </label>
                                    <input
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                    {errors.email ? (
                                        <Error>{errors.email}</Error>
                                    ) : null}
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Phone
                                    </label>
                                    <input
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                    {errors.phone ? (
                                        <Error>{errors.phone}</Error>
                                    ) : null}
                                </InputSeparator>
                            </TwoInputsLayout>
                        </div>
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg px-4 py-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleShowPassword()}
                                            className="absolute text-black top-0 bottom-0 right-2 text-xl"
                                        >
                                            {showPassword ? (
                                                <i className="fa-solid fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa-solid fa-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password ? (
                                        <Error>{errors.password}</Error>
                                    ) : null}
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={data.conf_password}
                                            onChange={(e) =>
                                                setData(
                                                    "conf_password",
                                                    e.target.value
                                                )
                                            }
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="w-full rounded-lg px-4 py-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleShowPassword()}
                                            className="absolute text-black top-0 bottom-0 right-2 text-xl"
                                        >
                                            {showPassword ? (
                                                <i className="fa-solid fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa-solid fa-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                    {errors.conf_password ? (
                                        <Error>{errors.conf_password}</Error>
                                    ) : null}
                                </InputSeparator>
                            </TwoInputsLayout>
                        </div>
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="block sm:max-w-sm sm:mx-auto w-full px-4 py-2 text-md border-2 border-white rounded-lg text-white hover:bg-orange"
                            >
                                Register
                            </button>
                        </div>
                        <div>
                            <p className="text-white">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-orange hover:underline"
                                >
                                    Login
                                </Link>{" "}
                                here.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
}

export default Register;
