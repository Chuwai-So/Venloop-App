'use client';

import { useState, useEffect, useRef } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import { db } from '@/app/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import QRCodeWithDownload from '@/app/components/QR/DownloadableQR';
import qrUrls from '@/app/util/qrUrls';
import UpdateButton from '@/app/components/Buttons/UpdateButton';
import GenerateQRButton from '@/app/components/Buttons/QrButton';
import DeleteButton from '@/app/components/Buttons/DeleteButton';

export default function TeamBar({ team, isExpanded, onToggle, refreshTeams }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(team.name);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [qrToken, setQrToken] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const qrRef = useRef();

    useEffect(() => {
        if (!isExpanded) {
            setShowQR(false);
            setQrToken(null);
        }
    }, [isExpanded]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await TeamService.updateTeam(team.id, { name: newName });
            setIsEditing(false);
            refreshTeams();
            alert("Successfully updated team");
        } catch (err) {
            console.error("Failed to update team name", err);
            alert("Failed to update team. Please try again.");
        }
        setIsSaving(false);
    };

    const handleGenerateQR = async () => {
        try {
            const qrRef = ref(db, "qr_tokens");
            const newTokenRef = await push(qrRef, {
                teamId: team.id,
                createdAt: serverTimestamp(),
            });
            setQrToken(newTokenRef.key);
            setShowQR(true);
        } catch (err) {
            console.error("Error generating QR token:", err);
            alert("Failed to generate QR code. Please try again.");
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this team?");
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await TeamService.deleteTeam(team.id);
            refreshTeams();
            alert("Successfully deleted team");
        } catch (err) {
            console.error("Failed to delete team", err);
            alert("Failed to delete team. Please try again.");
        }
        setIsDeleting(false);
    };

    const completedTaskList = team.completedTasks ? Object.keys(team.completedTasks) : [];

    return (
        <div
            className="bg-white shadow-md rounded-xl mb-4 p-4 transition-all duration-300 border border-gray-200 hover:shadow-lg cursor-pointer"
            onClick={onToggle}
        >
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="text-xl font-bold text-gray-800 border rounded px-2 py-1 w-full"
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                )}
                <span className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <>
                    {completedTaskList.length > 0 ? (
                        <ul className="mt-4 mb-4 list-disc list-inside text-gray-700 text-sm">
                            {completedTaskList.map((taskId) => (
                                <li key={taskId}>
                                    {team.completedTasks[taskId]?.name || taskId}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 mb-4 text-gray-400 text-sm italic">No completed tasks</p>
                    )}

                    {/* QR display */}
                    {showQR && qrToken && (
                        <div className="flex justify-center mb-2">
                            <QRCodeWithDownload
                                id={team.id}
                                url={qrUrls.teamDetail(team.id)}
                            />
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                        {isEditing ? (
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-[#1F2A60] transition disabled:opacity-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave();
                                }}
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        ) : (
                            <UpdateButton
                                isSaving={isSaving}
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                        {!showQR && (
                            <GenerateQRButton
                                disabled={isEditing || isSaving || isDeleting}
                                onClick={handleGenerateQR}
                            />
                        )}
                        <DeleteButton
                            isEditing={isEditing}
                            isDeleting={isDeleting}
                            onClick={handleDelete}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
