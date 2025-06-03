'use client';

import { useRef } from "react";

export default function TaskFeaturePicture({ file, onChange, disabled = false }) {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            onChange(selected);
        }
    };

    return (
        <div className="flex flex-col items-center text-black">
            <label className="text-md mb-2">Maak een foto!</label>

            <div
                className={`w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center transition ${
                    disabled
                        ? "bg-gray-200 opacity-50 pointer-events-none border-gray-300"
                        : "bg-gray-200 bg-opacity-40 hover:border-blue-400 border-gray-400 cursor-pointer"
                }`}
                onClick={handleClick}
            >
                {file ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <span className="text-sm text-gray-500 text-center px-2">Tik om uw camera te openen</span>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                capture="environment" // 🔒 Enforces camera use on mobile
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />
        </div>
    );
}
