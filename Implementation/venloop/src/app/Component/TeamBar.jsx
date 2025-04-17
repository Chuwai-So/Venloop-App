// TeamBar.jsx
"use client";
import { useEffect } from "react";

export default function TeamBar({ team, isExpanded, onToggle }) {
    return (
        <div
            className="bg-white shadow-md rounded-xl mb-4 p-4 transition-all duration-300 border border-gray-200 hover:shadow-lg cursor-pointer"
            onClick={onToggle}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <div className="mt-4 flex gap-4 justify-center">
                    <button className="px-4 py-2 bg-[#3C8DC3] text-white rounded-lg shadow hover:bg-[#1F2A60] transition">Update</button>
                    <button className="px-4 py-2 bg-[#3C8DC3] text-white rounded-lg shadow hover:bg-[#1F2A60] transition">QR-Code</button>
                    <button className="px-4 py-2 bg-[#D86F27] text-white rounded-lg shadow hover:bg-red-700 transition">Delete</button>
                </div>
            )}
        </div>
    );
}
