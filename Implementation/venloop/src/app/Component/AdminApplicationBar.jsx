"use client";

import { useState } from "react";
import AdminService from "@/app/AdminService/adminService";

export default function AdminApplicationBar({ admin, refreshList }) {
    const [processing, setProcessing] = useState(false);

    const handleVerify = async () => {
        if (!confirm(`Verify ${admin.name}?`)) return;
        setProcessing(true);
        await AdminService.approveAdmin(admin.id);
        await refreshList();
        setProcessing(false);
    };

    const handleDecline = async () => {
        if (!confirm(`Decline ${admin.name}?`)) return;
        setProcessing(true);
        await AdminService.deleteAdmin(admin.id);
        await refreshList();
        setProcessing(false);
    };

    return (
        <div className="bg-white shadow-md rounded-xl mb-4 p-4 border border-gray-200 hover:shadow-lg">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{admin.name}</h3>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
                <div className="flex gap-2">
                    {!admin.verified ? (
                        <>
                            <button
                                onClick={handleVerify}
                                disabled={processing}
                                className="px-4 py-1 bg-[#3C8DC3] text-white rounded hover:hover:bg-[#1F2A60] disabled:opacity-50"
                            >
                                Verify
                            </button>
                            <button
                                onClick={handleDecline}
                                disabled={processing}
                                className="px-4 py-1 bg-[#D86F27]  text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                                Decline
                            </button>
                        </>
                    ) : (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                            Verified
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
