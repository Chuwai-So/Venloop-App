'use client';
import {QRCode} from 'qrcode.react';

export default function QRCodeComponent({value, size, label}) {

    return (
        <div className="flex flex-col items-center space-y-2">
            <QRCode value={value} size={size} />
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    )
}