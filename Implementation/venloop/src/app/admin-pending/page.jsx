"use client";

import { useEffect, useState } from "react";
import AdminService from "@/app/AdminService/adminService";
import AdminApplicationBar from "@/app/Component/AdminApplicationBar";
import NavBar from "@/app/Component/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function AdminApprovalMenu() {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        try {
            const pendingAdmins = await AdminService.getUnverifiedAdmins();
            setAdmins(pendingAdmins);
        } catch (err) {
            console.error("Failed to fetch admins:", err);
            setAdmins([]);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <NavBar backTo="/admin-landing" />
                <div className="p-4">
                    <h1 className="text-black text-2xl font-bold mb-4">Admin Applications</h1>
                    {admins.length > 0 ? (
                        admins.map((admin) => (
                            <AdminApplicationBar
                                key={admin.id}
                                admin={admin}
                                refreshList={fetchAdmins}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No pending admin applications.</p>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
