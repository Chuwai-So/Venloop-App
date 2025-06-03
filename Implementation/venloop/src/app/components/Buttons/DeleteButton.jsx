'use client';

import Icon from "@/app/components/Icon"; // adjust path if needed

export default function DeleteButton({ isEditing, isDeleting, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow transition flex items-center gap-2 ${
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
            {isDeleting ? (
                'Deleting...'
            ) : (
                <>
                    <Icon name="trash-2-white" size="18px" />
                    <span>Delete</span>
                </>
            )}
        </button>
    );
}
