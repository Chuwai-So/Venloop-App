'use client';

export default function DeleteButton({ isEditing, isDeleting, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow transition ${
                isEditing || isDeleting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#D86F27] text-white hover:bg-red-700'
            }`}
            disabled={isEditing || isDeleting}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
