"use client";

import { useState, useEffect } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import { db } from '@/app/firebase';
import { ref, push, serverTimestamp, get, remove } from 'firebase/database';
import QRCodeWithDownload from '@/app/components/QR/DownloadableQR';
import qrUrls from '@/app/util/qrUrls';
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import KickCaptainButton from "@/app/components/Buttons/KickButton";
import Icon from "@/app/components/Icon";
// import Icon from "@/app/components/Icon"; // 👈 import your icon when ready

export default function TeamBar({ team, isExpanded, onToggle, refreshTeams }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(team.name);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isKicking, setIsKicking] = useState(false);
    const [teamToken, setTeamToken] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [expandedTasks, setExpandedTasks] = useState({});

    const toggleTask = (taskId) => {
        setExpandedTasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    const isOccupied = !!team.occupied;

    useEffect(() => {
        if (!isExpanded) {
            setShowQR(false);
            setTeamToken(null);
            setExpandedTasks({});
        }
    }, [isExpanded]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await TeamService.updateTeam(team.id, { name: newName });
            setIsEditing(false);
            refreshTeams();
            alert('Successfully updated team');
        } catch (err) {
            console.error('Failed to update team name', err);
            alert('Failed to update team. Please try again.');
        }
        setIsSaving(false);
    };

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this team?');
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await TeamService.deleteTeam(team.id);
            refreshTeams();
            alert('Successfully deleted team');
        } catch (err) {
            console.error('Failed to delete team', err);
            alert('Failed to delete team. Please try again.');
        }
        setIsDeleting(false);
    };

    const handleKickCaptain = async () => {
        const confirmed = confirm("Are you sure you want to remove this team's captain?");
        if (!confirmed) return;

        setIsKicking(true);
        try {
            const success = await TeamService.kickCaptain(team.id);
            if (!success) throw new Error("Backend failed");

            alert('Captain kicked and token revoked.');
            refreshTeams();
        } catch (err) {
            console.error('Kick captain error:', err);
            alert('Error kicking captain.');
        } finally {
            setIsKicking(false);
        }
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                        }}
                    />
                ) : (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                            {isExpanded && !isEditing && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                    className="text-gray-400 hover:text-[#1F2A60] transition"
                                    title="Edit team name"
                                >
                                    <Icon name="edit-3" size="20px" />
                                </button>
                            )}

                        </div>
                        <div className="flex gap-2 mt-1">
                            {isOccupied && (
                                <span className="text-sm text-red-600 font-medium">Occupied</span>
                            )}
                            {completedTaskList.length > 0 && (
                                <span className="text-sm text-[#1F2A60] font-medium">Tasks Completed</span>
                            )}
                        </div>
                    </div>
                )}
                <span className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <>
                    {completedTaskList.length > 0 ? (
                        <ul className="mt-4 mb-4 space-y-2 text-sm">
                            {completedTaskList.map((taskId) => {
                                const task = team.completedTasks[taskId];
                                const result = task?.result;
                                const status = task?.status;
                                const userAnswer = task?.userAnswer;

                                let textColor = "text-gray-500";
                                if (result === "correct" || status === "approved") {
                                    textColor = "text-green-600";
                                } else if (result === "incorrect" || status === "rejected") {
                                    textColor = "text-red-600";
                                }

                                const isOpen = expandedTasks[taskId];

                                return (
                                    <li key={taskId} className="cursor-pointer" onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTask(taskId);
                                    }}>
                                        <div className={`${textColor} font-medium`}>
                                            {task?.name || taskId}
                                        </div>
                                        {isOpen && (
                                            <div className="ml-4 mt-1 text-xs text-gray-600">
                                                {userAnswer ? `Answer: ${userAnswer}` : status ? `Status: ${status}` : 'No result/status available'}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="mt-4 mb-4 text-gray-400 text-sm italic">No completed tasks</p>
                    )}

                    {showQR && teamToken && (
                        <div className="flex justify-center mb-2">
                            <QRCodeWithDownload id={team.id} url={qrUrls.teamDetail(team.id)} />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                        {isEditing && (
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-[#1F2A60] transition disabled:opacity-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave();
                                }}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        )}

                        <DeleteButton
                            isEditing={isEditing}
                            isDeleting={isDeleting}
                            onClick={handleDelete}
                        />

                        {isOccupied && (
                            <KickCaptainButton
                                isEditing={isEditing}
                                isKicking={isKicking}
                                onClick={handleKickCaptain}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
