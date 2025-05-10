'use client';

export default function UpdateButton({ isSaving, onClick }) {
    return (
        <button
            className="px-4 py-2 bg-[#3C8DC3] text-white rounded-lg shadow hover:bg-[#1F2A60] transition disabled:opacity-50"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            disabled={isSaving}
        >
            {isSaving ? 'Saving...' : 'Update'}
        </button>
    );
}
