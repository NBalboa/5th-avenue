import InputSeparator from "@/components/InputSeparator";
import TwoInputsLayout from "@/Layouts/TwoInputsLayout";
import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import React from "react";

function Register() {
    return (
        <UserLayout>
            <div className="max-w-3xl mx-auto px-14 py-12 border-2 border-white rounded-lg">
                <div className="space-y-3">
                    <h2 className="text-white text-2xl font-semibold">
                        Create an Account
                    </h2>
                    <form className="w-full space-y-3 p-4 rounded-lg">
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                            </TwoInputsLayout>
                        </div>
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                            </TwoInputsLayout>
                        </div>
                        <div>
                            <TwoInputsLayout>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
                                </InputSeparator>
                                <InputSeparator>
                                    <label className="text-white text-md font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2"
                                    />
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
