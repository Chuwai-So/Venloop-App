'use client';

export default function FeedbackPopup({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <div className="flex justify-center mb-4">
                    <img src="/fontys-logo.png" alt="Logo" className="h-7" />
                </div>

                <h2 className="text-xl font-bold mb-4 text-center">Thank You for Playing!</h2>
                <p className="mb-4 text-center">
                    Because this is a student project of Fontys, we would highly appreciate your feedback.
                </p>
                <p className="mb-4 text-sm italic text-center">
                    Please send feedback to: <strong>email@provider.com</strong>
                </p>

                <div className="flex justify-center">
                    <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
