'use client';
import { useRef } from "react";
import QRCode from "@/app/components/QR/QRCode";
import Icon from "@/app/components/Icon"; // Make sure path is correct

export default function QRCodeWithDownload({ id, url }) {
    const qrRef = useRef(null);

    const handleDownload = () => {
        const svg = document.querySelector(`#qr-wrapper-${id} svg`);
        if (!svg) {
            alert("QR code not found.");
            return;
        }

        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `team-${id}-qr.svg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error("Error downloading QR code:", err);
            alert("Failed to download QR code.");
        }
    };

    return (
        <div
            className="mt-4 flex flex-col items-center gap-2"
            id={`qr-wrapper-${id}`}
            ref={qrRef}
            onClick={(e) => e.stopPropagation()}
        >
            <QRCode id={`qr-${id}`} value={url} />
            <button
                onClick={handleDownload}
                className="mt-2 px-4 py-1 bg-[#3C8DC3] text-white text-sm rounded shadow hover:bg-[#1F2A60] flex items-center gap-2"
            >
                <Icon name="download-white" size="16px" />
                <span>Download QR Code</span>
            </button>
        </div>
    );
}
