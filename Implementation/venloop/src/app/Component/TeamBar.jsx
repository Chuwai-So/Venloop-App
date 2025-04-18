"use client";
import {useState} from "react";
import TeamService from "@/app/TeamService/teamService";

export default function TeamBar({team, isExpanded, onToggle, refreshTeams}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(team.name);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await TeamService.updateTeam(team.id, {name: newName});
            setIsEditing(false);
            refreshTeams(); // <-- Refresh parent data
        } catch (err) {
            console.error("Failed to update team name", err);
        }
        setIsSaving(false);
    };

    const completedTaskList
        = team.tasks ?
        Object.keys(team.tasks) : [];

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

                <>  {completedTaskList.length > 0 ? (
                    <ul className="mt-4 mb-4 list-disc list-inside text-gray-700 text-sm">
                        {completedTaskList.map((taskId) => (
                            <li key={taskId}>{taskId}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 mb-4 text-gray-400 text-sm italic">No completed tasks</p>
                )}

                    <div className="mt-4 flex gap-4 justify-center">
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
                            <button
                                className="px-4 py-2 bg-[#3C8DC3] text-white rounded-lg shadow hover:bg-[#1F2A60] transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditing(true);
                                }}
                            >
                                Update
                            </button>
                        )}
                        <button
                            className={`px-4 py-2 rounded-lg shadow transition ${
                                isEditing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#3C8DC3] text-white hover:bg-[#1F2A60]"
                            }`}
                            disabled={isEditing}
                            onClick={(e) => e.stopPropagation()}
                        >
                            QR-Code
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg shadow transition ${
                                isEditing ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#D86F27] text-white hover:bg-red-700"
                            }`}
                            disabled={isEditing}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
