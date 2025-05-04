"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import CleanNavBar from "@/app/Component/NavBars/CleanNavBar";
import {doSignInWithEmailAndPassword} from "@/app/auth";
import {useAuth} from "@/app/contexts/authContext";

export default function LoginPage() {
    const {userLoggedIn} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setErrorMessage("");
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (err) {
                const message = err.message || String(err);
                setErrorMessage(message);
                console.error("Login Error", err);
            } finally {
                setIsSigningIn(false);
            }
        }
    };


    useEffect(() => {
        if (userLoggedIn) {
            console.log("logged in");
            console.log("Redirecting to /admin-landing");
            router.replace("/admin-landing");
        }
    }, [userLoggedIn, router]);


    return (
        <div className="min-h-screen bg-gray-50">
            <CleanNavBar />

            <div className="flex items-center justify-center h-[calc(100vh-72px)]">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
                >
                    <h2 className="text-2xl font-bold text-center text-[#1F2A60]">Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C8DC3]"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-black border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3C8DC3]"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-[#3C8DC3] text-white font-bold py-2 rounded hover:scale-102 transition-transform"
                    >
                        Log In
                    </button>

                    <p className="text-sm text-center text-gray-500">
                        Don't have an account?{" "}
                        <span className="text-[#D86F27] hover:underline cursor-pointer">Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
}