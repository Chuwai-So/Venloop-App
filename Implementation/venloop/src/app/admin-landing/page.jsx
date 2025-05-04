"use client";


import LogOutNavBar from "@/app/Component/NavBars/LogOutNavBar";
import GridButtons from "@/app/Component/GridButtons";
import ProtectedRoute from "@/app/ProtectedRoute";


export default function AdminLandingPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 relative overflow-hidden">
                <LogOutNavBar/>
                <GridButtons/>
            </div>
        </ProtectedRoute>
    );
}
