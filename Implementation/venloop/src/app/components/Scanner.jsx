'use client';

import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrScanner({ onScanSuccess, onScanFailure }) {
    const handleCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataUrl = reader.result;
                console.log("Image captured:", imageDataUrl);
                alert("Image captured! Add QR decoding logic here.");
                // You can now send imageDataUrl to a QR decoder
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="text-center">
            <input
                id="cameraInput"
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={handleCapture}
            />
            <button
                onClick={() => document.getElementById("cameraInput").click()}
                className="bg-blue-700 px-6 py-3 text-white font-semibold rounded shadow-md hover:bg-blue-800"
            >
                Open Camera
            </button>
        </div>
    );
}