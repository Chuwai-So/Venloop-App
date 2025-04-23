"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import CleanNavBar from "@/app/Component/CleanNavBar";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <CleanNavBar />

            <div className="flex items-center justify-center h-[calc(100vh-72px)]">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center text-[#1F2A60]">Login</h2>

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

                    <button
                        type="submit"
                        className="bg-[#3C8DC3] text-white font-bold py-2 rounded hover:scale-102 transition-transform"
                    >
                        Log In
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Don't have an account? <span className="text-[#D86F27] hover:underline cursor-pointer">Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
}