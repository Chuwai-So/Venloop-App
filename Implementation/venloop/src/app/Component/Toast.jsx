"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Toast({ message, onClose, type = "success" }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timeout = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 6000);
        return () => clearTimeout(timeout);
    }, [onClose]);

    const colorMap = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-yellow-600 text-black",
    };

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 px-5 py-4 rounded-lg shadow-lg text-white flex items-start justify-between gap-4 max-w-xs transition-transform duration-300 transform ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${colorMap[type] || colorMap.success}`}
        >
            <span className="flex-1">{message}</span>
            <button onClick={onClose} className="text-white hover:text-gray-300 transition">
                <X size={18} />
            </button>
        </div>
    );
}
