"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, getAuth } from "firebase/auth";
import AdminService from "@/app/AdminService/adminService";

export default function AccountDropdown() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [admin, setAdmin] = useState(null);
    const menuRef = useRef(null);
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchAdmin = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const fetchedAdmin = await AdminService.getAdminByFirebaseUid(user.uid);
                setAdmin(fetchedAdmin);
            } catch (err) {
                console.error("Failed to fetch admin data:", err);
            }
        };

        fetchAdmin();
    }, [auth.currentUser]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
        if (!confirmDelete) return;

        try {
            await deleteUser(auth.currentUser);
            alert("Account deleted");
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete account. You may need to log in again.");
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <span
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-blue-400 cursor-pointer"
            >
                Account
            </span>

            {menuOpen && auth.currentUser && (
                <div className="absolute right-0 mt-2 w-75 bg-white text-black rounded-lg shadow-lg p-4 z-40">
                    <p className="font-semibold">
                        {admin?.name || "Unnamed User"}
                    </p>
                    <p className="text-sm text-gray-600">{auth.currentUser.email}</p>
                    <div className="mt-4">
                        {admin?.isSuper ? (
                            <button
                                onClick={() => router.push("/admin-pending")}
                                className="w-full bg-[#3C8DC3] text-white py-2 px-4 rounded hover:bg-[#1F2A60]"
                            >
                                Go to Admin Page
                            </button>
                        ) : (
                            <button
                                onClick={handleDelete}
                                className="w-full bg-[#D86F27] text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                Delete Account
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
