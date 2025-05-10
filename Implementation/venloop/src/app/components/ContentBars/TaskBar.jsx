'use client';

import { useEffect, useState } from 'react';
import QRCodeWithDownload from '@/app/components/QR/DownloadableQR';
import qrUrls from '@/app/util/qrUrls';
import { db } from '@/app/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

import UpdateButton from '@/app/components/Buttons/UpdateButton';
import GenerateQRButton from '@/app/components/Buttons/QrButton';
import DeleteButton from '@/app/components/Buttons/DeleteButton';

export default function TaskBar({ task, isExpanded, onToggle, onDelete, router }) {
    const [showQR, setShowQR] = useState(false);
    const [qrToken, setQrToken] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!isExpanded) {
            setShowQR(false);
            setQrToken(null);
        }
    }, [isExpanded]);

    const handleGenerateQR = async () => {
        try {
            const qrRef = ref(db, "qr_tokens");
            const newTokenRef = await push(qrRef, {
                entityId: task.id,
                createdAt: serverTimestamp(),
            });
            setQrToken(newTokenRef.key);
            setShowQR(true);
        } catch (err) {
            console.error("Error generating QR token:", err);
            alert("Failed to generate QR code.");
        }
    };

    const handleDeleteClick = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        setIsDeleting(true);
        await onDelete(task.id);
        setIsDeleting(false);
    };

    return (
        <div
            className="bg-white shadow-md rounded-xl mb-4 p-4 transition-all duration-300 border border-gray-200 hover:shadow-lg cursor-pointer text-black w-full"
            onClick={onToggle}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold break-words text-gray-800">{task.name}</h2>
                <span className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <div className="mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                    {showQR && qrToken && (
                        <div className="flex justify-center">
                            <QRCodeWithDownload
                                id={task.id}
                                url={qrUrls.taskDetail(task.id)}
                            />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                        <UpdateButton
                            isSaving={false}
                            onClick={() => router.push(`/task-template-edit/view?id=${task.id}`)}
                        />
                        {!showQR && (
                            <GenerateQRButton
                                disabled={false}
                                onClick={handleGenerateQR}
                            />
                        )}
                        <DeleteButton
                            isEditing={false}
                            isDeleting={isDeleting}
                            onClick={handleDeleteClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
