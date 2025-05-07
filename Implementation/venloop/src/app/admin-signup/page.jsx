"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CleanNavBar from "@/app/Component/NavBars/CleanNavBar";
import AdminService from "@/app/AdminService/adminService";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            await AdminService.createAdmin({ name, email, password });
            alert("Sign Up Request Sent Successfully!");
        } catch (error) {
            console.error("Error signing up: ", error);
            const message = parseFirebaseError(error);
            setErrorMessage(message);
        }
    };

    const parseFirebaseError = (error) => {
        if (!error?.code) return "Something went wrong. Please try again later.";

        switch (error.code) {
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/email-already-in-use":
                return "This email is already in use.";
            case "auth/weak-password":
                return "Password must be at least 6 characters.";
            default:
                return "Registration failed. Please try again.";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <CleanNavBar />

            <div className="flex items-center justify-center h-[calc(100vh-72px)]">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
                >
                    <h2 className="text-2xl font-bold text-center text-[#1F2A60]">Sign Up</h2>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C8DC3]"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C8DC3]"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C8DC3]"
                        required
                    />

                    {errorMessage && (
                        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-[#3C8DC3] text-white font-bold py-2 rounded hover:scale-102 transition-transform"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        All sign up requests will be verified by an admin. Thank you for your patience!
                    </p>
                </form>
            </div>
        </div>
    );
}
