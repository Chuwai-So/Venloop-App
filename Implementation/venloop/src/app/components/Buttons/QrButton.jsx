'use client';

export default function GenerateQRButton({ disabled, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow transition ${
                disabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#3C8DC3] text-white hover:bg-[#1F2A60]'
            }`}
            disabled={disabled}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            QR-Code
        </button>
    );
}
