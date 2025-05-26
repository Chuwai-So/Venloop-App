'use client';

export default function FeedbackPopup({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <div className="flex justify-center mb-4">
                    <img src="/fontys-logo.png" alt="Logo" className="h-20" />
                </div>

                <h2 className="text-xl font-bold mb-4 text-center">Bedankt voor het spelen!</h2>
                <p className="mb-4 text-center">
                    Dit is onderdeel van een studentenproject van Fontys. Nu je alle taken hebt uitgevoerd stellen we je feedback zeer op prijs!
                    <br/>
                    Ontwikkeld door Fontys studenten: Chuwai, Felix en Aleks
                </p>
                <p className="mb-4 text-sm italic text-center">
                    Stuur feedback naar: <strong>542631@student.fontys.nl</strong>
                </p>

                <div className="flex justify-center">
                    <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={onClose}
                    >
                        Sluit
                    </button>
                </div>
            </div>
        </div>
    );
}
