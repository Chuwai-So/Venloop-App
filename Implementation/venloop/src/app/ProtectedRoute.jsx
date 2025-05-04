"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/authContext";

export default function ProtectedRoute({ children }) {
    const { userLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !userLoggedIn) {
            router.push("/admin-login"); // or your login route
        }
    }, [userLoggedIn, loading, router]);

    if (loading || !userLoggedIn) {
        return <div className="p-4">Loading...</div>; // Optional loading UI
    }

    return children;
}
