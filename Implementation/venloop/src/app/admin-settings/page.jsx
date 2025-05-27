"use client";

import NavBar from "@/app/components/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";
import AdminLandingPage from "@/app/admin-landing/page";

export default function AdminSettings() {
    return(
        <ProtectedRoute>
            <div>
                <NavBar backTo={AdminLandingPage} showInfoButton={true}/>
            </div>
        </ProtectedRoute>
    )
}