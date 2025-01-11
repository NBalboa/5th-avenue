import Error from "@/components/Error";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post("/login", {
            preserveScroll: true,
            onError: (error) => {
                if (error?.invalid) {
                    toast.error(error?.invalid);
                }
            },
        });
    }
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }
    return (
        <UserLayout>
            <Head title="Login" />
            <div className="max-w-lg mx-auto px-14 py-12 border-2 border-white rounded">
                <div className="space-y-3">
                    <h2 className="text-white text-3xl font-semibold">Login</h2>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-white text-md">Email</label>
                            <input
                                type="text"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="px-4 py-2 w-full rounded"
                            />
                            {errors.email ? (
                                <Error>{errors.email}</Error>
                            ) : null}
                        </div>
                        <div className="space-y-2">
                            <label className="text-white text-md">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="px-4 py-2 w-full rounded pe-10"
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
                        </div>
                        <div>
                            <a
                                href="#"
                                className="block text-white w-full text-end hover:underline hover:text-orange"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="rounded-lg text-white px-4 py-2 w-full border-2 border-white text-md hover:bg-orange"
                            >
                                Login
                            </button>
                        </div>
                        <div>
                            <p className="text-white">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-orange hover:underline"
                                >
                                    Register
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

export default Login;
