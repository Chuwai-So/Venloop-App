'use client';

import Icon from "@/app/components/Icon"; // adjust path if needed

export default function KickCaptainButton({ isEditing, isKicking, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow transition flex items-center gap-2 ${
                isEditing || isKicking
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D86F27] text-white hover:bg-red-700'
            }`}
            disabled={isEditing || isKicking}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {isKicking ? (
                'Kicking...'
            ) : (
                <>
                    <Icon name="user-x" size="18px" />
                    <span>Kick Captain</span>
                </>
            )}
        </button>
    );
}
