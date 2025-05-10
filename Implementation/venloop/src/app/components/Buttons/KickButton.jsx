'use client';

export default function KickCaptainButton({ isEditing, isKicking, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow transition ${
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
            {isKicking ? 'Kicking...' : 'Kick Captain'}
        </button>
    );
}
