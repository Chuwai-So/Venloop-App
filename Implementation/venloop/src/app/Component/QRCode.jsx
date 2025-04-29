'use client';
import {QRCodeSVG} from 'qrcode.react';

export default function QRCodeComponent({value, size, label}) {

    return (
        <div className="flex flex-col items-center space-y-2">
            <QRCodeSVG value={value} size={size} />
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    )
}