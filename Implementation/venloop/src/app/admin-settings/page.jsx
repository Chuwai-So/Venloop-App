"use client";

import NavBar from "@/app/components/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function AdminSettings() {
    return(
        <ProtectedRoute>
            <div>
                <NavBar/>
            </div>
        </ProtectedRoute>
    )
}