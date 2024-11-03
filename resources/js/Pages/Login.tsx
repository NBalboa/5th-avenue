import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import React from "react";

function Login() {
    return (
        <UserLayout>
            <div className="max-w-lg mx-auto px-14 py-12 border-2 border-white rounded">
                <div className="space-y-3">
                    <h2 className="text-white text-3xl font-semibold">Login</h2>
                    <form className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-white text-md">Email</label>
                            <input
                                type="text"
                                className="px-4 py-2 w-full rounded"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-white text-md">
                                Password
                            </label>
                            <input
                                type="text"
                                className="px-4 py-2 w-full rounded"
                            />
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
